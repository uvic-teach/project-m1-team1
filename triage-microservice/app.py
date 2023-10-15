import datetime
import os
import pyodbc

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

connection_string = os.getenv('AZURE_SQL_CONNECTIONSTRING')

@app.route("/", methods=["GET"])
@jwt_required()
def home():
    return jsonify({"message": "Welcome - Triage API"}), 200


@app.route("/form", methods=["GET"])
@jwt_required()
def get_form():
    username = get_jwt_identity()

    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT TOP 1 * FROM Patient WHERE Username = ? ORDER BY CreatedTimestamp DESC", (username))
        db_data = cursor.fetchone()
        if (db_data is None):
            return jsonify({"message": "You haven't completed any forms."}), 200
        else:
            data = []
            columns = [column[0] for column in cursor.description]

            data.append(dict(zip(columns, db_data)))
            return jsonify(data), 200


@app.route("/form", methods=["POST"])
@jwt_required()
def create_form():
    username = get_jwt_identity()
    data = request.get_json()

    with get_conn() as conn:
        cursor = conn.cursor()
        query = "INSERT INTO Patient (Username, Name, Age, Address, Phone, Symptom1, Symptom2, Condition1, Condition2, CreatedTimestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        param = [username
                 ,data.get('name', None)
                 ,int(data.get('age', None))
                 ,data.get('address', None)
                 ,data.get('phone', None)
                 ,data.get('symptom1', None)
                 ,data.get('symptom2', None)
                 ,data.get('condition1', None)
                 ,data.get('condition2', None)
                 ,datetime.datetime.now()]
        cursor.execute(query, param)
        cursor.commit()

        data["message"] = "Form submitted."
        return jsonify(data), 200


def get_conn():
    return pyodbc.connect(os.getenv('AZURE_SQL_CONNECTIONSTRING'))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0", port=5001)
