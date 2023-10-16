
from flask import Flask, jsonify, request
import datetime
import os
import pyodbc
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required


app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

connection_string = os.getenv('AZURE_SQL_CONNECTIONSTRING')

@app.route('/', methods=["GET"])
@jwt_required()
def get_waitlist():
    username = get_jwt_identity()

    with get_conn() as conn: 
        cursor = conn.cursor()
        getPatientQuery = " SELECT WaitlistId FROM Waitlist WHERE AccountId = (SELECT AccountId FROM Account WHERE Username = ?)"

        cursor.execute(getPatientQuery, username)
        patientInfo = cursor.fetchone()

        if(patientInfo is None):
            cursor.execute("SELECT COUNT(*) as C FROM Waitlist WHERE CAST(BookedDatetime AS DATE) = ?", datetime.date.today())
        
        else:
            query ="SELECT COUNT(*) as C FROM Waitlist WHERE CAST(BookedDatetime AS DATE) = ? AND WaitlistId < ?"
            cursor.execute(query, (datetime.date.today(), patientInfo.WaitlistId))
        
        db_data = cursor.fetchone()

        if(db_data.C <= 0):
            return jsonify({"message": "Waitlist is empty."}), 200 
        else: 
            return jsonify({"Number of patients ahead": db_data.C}), 200



## POST WAITLIST 

@app.route('/', methods=["POST"])
@jwt_required()
def enter_waitlist():       
    
    username = get_jwt_identity()

    with get_conn() as conn: 
        cursor = conn.cursor()
        getPatientQuery = "SELECT AccountId, PatientId FROM Patient where Username = ?"
        getPatientQueryParam = [username]

        cursor.execute(getPatientQuery, getPatientQueryParam)
        patientInfo = cursor.fetchone()

        cursor.execute("SELECT * FROM Waitlist where AccountId = ?", patientInfo.AccountId)
        
        if cursor.fetchone() is None:

            query = "INSERT INTO Waitlist (AccountId , PatientId , BookedDateTime ) VALUES ( ?, ?, ?)"
            cursor.execute(query, (patientInfo.AccountId, patientInfo.PatientId, datetime.datetime.now()))
            cursor.commit()

            return jsonify({"message": "You have been added to the waitlist"}), 200

        else: return  jsonify({"message": "You are already in the waitlist"}), 400

    
@app.route('/', methods=["DELETE"])
@jwt_required()

def remove_from_waitlist():

    username = get_jwt_identity()
    waitlistId = request.json.get("waitlistId", None)

    with get_conn() as conn: 
        cursor = conn.cursor()
        cursor.execute("SELECT IsDoctor as Doc FROM Account where Username = ?", username)
        user = cursor.fetchone()

        if(user.Doc == 1):

            cursor.execute("DELETE FROM Waitlist where WaitlistId = ? ", waitlistId)
            return jsonify({"message": f"Patient {waitlistId} removed from waitlist"}), 200
        
        else: 

            return jsonify({"message": "Unauthorized Access"}), 400


def get_conn():
    return pyodbc.connect(os.getenv('AZURE_SQL_CONNECTIONSTRING'))

if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0", port=5002)