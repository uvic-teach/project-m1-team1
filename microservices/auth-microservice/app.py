import datetime
import os

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)

# Enable CORS
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome, please login or register."}), 200


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            "SELECT * FROM Account WHERE username = %s LIMIT 1", [username])

        db_data = cursor.fetchone()
        if (db_data is None or password != db_data["password"]):
            return jsonify({"status": "fail", "message": "Bad username or password."}), 401

        response = {
            "status": "success",
            "message": f"Successfully logged in as {username}",
            "role": f'''{db_data["is_doctor"]}''',
            "auth_token": create_access_token(identity=username)
        }
        return jsonify(response), 200


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            "SELECT * FROM Account WHERE username = %s LIMIT 1", [username])

        if (cursor.fetchone() is not None):
            return jsonify({"status": "fail", "message": "Username already exists"}), 401

        # Insert info into Account table
        cursor.execute("INSERT INTO Account (username, password) VALUES (%s, %s) RETURNING account_id", [
                       username, password])
        accountId = cursor.fetchone()[0]

        # Insert info into Patient table
        query = "INSERT INTO Patient (account_id, username, name, age, address, phone, created_timestamp) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        param = [accountId, username, data.get('name', None), int(data.get('age', None)), data.get(
            'address', None), data.get('phone', None), datetime.datetime.now()]
        cursor.execute(query, param)

        response = {
            "status": "success",
            "username": username,
            "password": password,
            "message": f"User {username} created."
        }
        return jsonify(response), 201


def get_conn():
    return psycopg2.connect(
        user = os.getenv('db_username'),
        password = os.getenv('db_password'),
        host = os.getenv('db_host'),
        port = os.getenv('db_port'),
        database = os.getenv('db_database'),
        sslmode = os.getenv('db_sslmode'))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0", port=5000)
