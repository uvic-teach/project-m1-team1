import datetime
import os

import psycopg2
import psycopg2.extras
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required

app = Flask(__name__)

# Enable CORS
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)


@app.route("/", methods=["GET"])
@jwt_required()
def home():
    return jsonify({"message": "Welcome - Triage API"}), 200


@app.route("/form", methods=["GET"])
@jwt_required()
def get_form():
    username = get_jwt_identity()

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        getPatientQuery = "SELECT account_id, patient_id FROM Patient WHERE username=%s LIMIT 1"
        getPatientQueryParam = [username]
        cursor.execute(getPatientQuery, getPatientQueryParam)
        patientInfo = cursor.fetchone()
        print(patientInfo)

        getTriagesQuery = "SELECT * FROM Triage WHERE account_id = %s AND patient_id = %s ORDER BY created_timestamp DESC"
        cursor.execute(getTriagesQuery, [
                       patientInfo["account_id"], patientInfo["patient_id"]])
        db_data = cursor.fetchall()
        print(db_data)

        if db_data:
            data = []
            columns = [column[0] for column in cursor.description]

            for row in db_data:
                data.append(dict(zip(columns, row)))

            return jsonify(data), 200
        else:
            return jsonify({"message": "You haven't completed any forms."}), 200

@app.route("/form", methods=["POST"])
@jwt_required()
def create_form():
    username = get_jwt_identity()
    data = request.get_json()

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        getPatientQuery = "SELECT account_id, patient_id FROM Patient WHERE Username=%s LIMIT 1"
        getPatientQueryParam = [username]
        cursor.execute(getPatientQuery, getPatientQueryParam)
        patientInfo = cursor.fetchone()

        s1 = data.get('Symptom1', None)
        s2 = data.get('Symptom2', None)
        s3 = data.get('Symptom3', None)
        c1 = data.get('Condition1', None)
        c2 = data.get('Condition2', None)
        c3 = data.get('Condition3', None)

        outcome = ''
        if (all(i is not None for i in [s1, s2, s3, c1, c2, c3])):
            outcome = 'ED. You\'ve been added to the waitlist.'
            token = request.headers["Authorization"].split(" ")[1]
            headers = {
                'Authorization': f"Bearer {token}",
                'Content-Type': 'application/json'
            }
            requests.request("POST", "http://localhost:5002", headers=headers)
        elif (all(i is None for i in [s1, s2, s3, c1, c2, c3])):
            outcome = 'You\'re Okay'
        elif (
            s1 is None and
            s2 is None and
            s3 is None
        ):
            outcome = 'In-person Triage. Visit your GP'
        elif (
            c1 is None and
            c2 is None and
            c3 is None
        ):
            outcome = 'Purchase over-the-counter meds'
        else:
            outcome = 'Contact the Hotline (1-800-9999)'

        query = '''INSERT INTO Triage (
                account_id
                ,patient_id
                ,symptom_1
                ,symptom_2
                ,symptom_3
                ,condition_1
                ,condition_2
                ,condition_3
                ,outcome
                ,created_timestamp 
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

        cursor.execute(query, [
            patientInfo["account_id"],
            patientInfo["patient_id"],
            s1, s2, s3, c1, c2, c3,
            outcome, datetime.datetime.now()])
        conn.commit()

        data["message"] = "Form submitted."
        data["outcome"] = outcome
        return jsonify(data), 200


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
    app.run(debug=True, host="0.0.0.0", port=5001)
