import os
import pyodbc

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, JWTManager

app = Flask(__name__)

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
        cursor.execute(
            f"SELECT TOP 1 * FROM Account WHERE username = ?", (username))

        db_data = cursor.fetchone()
        if (db_data is None or password != db_data.Password):
            return jsonify({"status": "fail", "message": "Bad username or password."}), 401

        response = {
            "status": "success",
            "message": "Successfully logged in.",
            "auth_token": create_access_token(identity=username)
        }
        return jsonify(response), 200


@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"SELECT TOP 1 * FROM Account WHERE username = ?", (username))

        if (cursor.fetchone() is not None):
            return jsonify({"status": "fail", "message": "Username already exists"}), 401

        cursor.execute(
            f"INSERT INTO Account (username, password) VALUES (?, ?)", (username, password))
        conn.commit()

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
    app.run()
