import datetime
import os
import pyodbc

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required
import requests


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
        
        getPatientQuery = "SELECT TOP 1 AccountId, PatientId FROM Patient WHERE Username=?"
        getPatientQueryParam = [username]
        cursor.execute(getPatientQuery, getPatientQueryParam)
        patientInfo = cursor.fetchone()
        
        getTriagesQuery = "SELECT * FROM Triage WHERE AccountId = ? AND PatientId = ? ORDER BY CreatedTimestamp DESC"
        cursor.execute(getTriagesQuery, (patientInfo.AccountId, patientInfo.PatientId))
        db_data = cursor.fetchall()
        
        if (db_data is None):
            return jsonify({"message": "You haven't completed any forms."}), 200
        else:
            data = []
            columns = [column[0] for column in cursor.description]

            for row in db_data:
                data.append(dict(zip(columns, row)))

            return jsonify(data), 200


@app.route("/form", methods=["POST"])
@jwt_required()
def create_form():
    username = get_jwt_identity()
    data = request.get_json()

    with get_conn() as conn:
        cursor = conn.cursor()

        getPatientQuery = "SELECT TOP 1 AccountId, PatientId FROM Patient WHERE Username=?"
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
        if(all(i is not None for i in [s1, s2, s3, c1, c2, c3])):
            outcome = 'ED. You\'ve been added to the waitlist.'
            token = request.headers["Authorization"].split(" ")[1]
            print(token)
            print(request.headers)
            headers = {
                'Authorization': f"Bearer {token}",
                'Content-Type': 'application/json'
            }
            requests.request("POST", "http://localhost:5002", headers=headers)
        elif(all(i is None for i in [s1, s2, s3, c1, c2, c3])):
            outcome = 'You\'re Okay'
        elif(
            s1 is None and
            s2 is None and
            s3 is None
        ):
            outcome = 'In-person Triage. Visit your GP'
        elif(
            c1 is None and
            c2 is None and
            c3 is None
        ):
            outcome = 'Purchase over-the-counter meds'
        else:
            outcome = 'Contact the Hotline (1-800-9999)'

        query = '''INSERT INTO Triage (
                AccountId
                ,PatientId
                ,Symptom1
                ,Symptom2
                ,Symptom3
                ,Condition1
                ,Condition2
                ,Condition3
                ,Outcome
                ,CreatedTimestamp 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

        cursor.execute(query, (
            patientInfo.AccountId, 
            patientInfo.PatientId, 
            s1, s2, s3, c1, c2, c3, 
            outcome, datetime.datetime.now())
        )
        cursor.commit()

        data["message"] = "Form submitted."
        data["outcome"] = outcome
        return jsonify(data), 200


def get_conn():
    return pyodbc.connect(os.getenv('AZURE_SQL_CONNECTIONSTRING'))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0", port=5001)
