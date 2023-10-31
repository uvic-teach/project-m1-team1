import datetime
import os
import pyodbc

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

connection_string = os.getenv("AZURE_SQL_CONNECTIONSTRING")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome, please login or register."}), 200


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT TOP 1 * FROM Account WHERE username = ?", (username))

        db_data = cursor.fetchone()
        if (db_data is None or password != db_data.Password):
            return jsonify({"status": "fail", "message": "Bad username or password."}), 401

        response = {
            "status": "success",
            "message": f"Successfully logged in as {username}",
            "auth_token": create_access_token(identity=username)
        }
        return jsonify(response), 200


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT TOP 1 * FROM Account WHERE Username = ?", username)

        if (cursor.fetchone() is not None):
            return jsonify({"status": "fail", "message": "Username already exists"}), 401

        # Insert info into Account table
        cursor.execute("INSERT INTO Account (Username, Password) VALUES (?, ?)", (username, password))
        cursor.execute("SELECT @@IDENTITY AS ID;")
        accountId = cursor.fetchone()[0]        
        
        # Insert info into Patient table
        query = "INSERT INTO Patient (AccountId, Username, Name, Age, Address, Phone, CreatedTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?)"
        param = [accountId
                 ,username
                 ,data.get('name', None)
                 ,int(data.get('age', None))
                 ,data.get('address', None)
                 ,data.get('phone', None)
                 ,datetime.datetime.now()]
        cursor.execute(query, param)

        response = {
            "status": "success",
            "username": username,
            "password": password,
            "message": f"User {username} created."
        }
        return jsonify(response), 201


def get_conn():
    return pyodbc.connect(os.getenv("AZURE_SQL_CONNECTIONSTRING"))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0", port=5000)