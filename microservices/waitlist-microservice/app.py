import datetime
import os

import psycopg2
import psycopg2.extras
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


@app.route('/', methods=["GET"])
@jwt_required()
def get_waitlist():
    username = get_jwt_identity()

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        cursor.execute(
            "SELECT is_doctor FROM Account WHERE username = %s LIMIT 1", [username])

        isDoctor = cursor.fetchone()
        if (isDoctor["is_doctor"] is True):
            cursor.execute(
                "SELECT w.*, p.name, p.age, p.address, p.phone FROM Waitlist w JOIN Patient p ON w.patient_id = p.patient_id")
            data = []
            columns = [column[0] for column in cursor.description]

            for row in cursor.fetchall():
                data.append(dict(zip(columns, row)))

            return jsonify(data), 200
        else:
            getPatientQuery = " SELECT waitlist_id FROM Waitlist WHERE account_id = (SELECT account_id FROM Account WHERE username = %s)"

            cursor.execute(getPatientQuery, [username])
            patientInfo = cursor.fetchone()

            if patientInfo:
                query = "SELECT COUNT(*) AS c FROM Waitlist WHERE waitlist_id < %s"
                cursor.execute(
                    query, [patientInfo["waitlist_id"]])
            else:
                cursor.execute(
                    "SELECT COUNT(*) AS c FROM Waitlist")

            db_data = cursor.fetchone()
            if (db_data["c"] <= 0):
                return jsonify({"message": "Waitlist is empty."}), 200
            else:
                return jsonify({"Number of patients ahead": db_data["c"]}), 200


@app.route('/', methods=["POST"])
@jwt_required()
def enter_waitlist():
    username = get_jwt_identity()

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        getPatientQuery = "SELECT account_id, patient_id FROM Patient where username = %s"
        getPatientQueryParam = [username]

        cursor.execute(getPatientQuery, getPatientQueryParam)
        patientInfo = cursor.fetchone()

        cursor.execute(
            "SELECT * FROM Waitlist where account_id = %s", [patientInfo["account_id"]])

        if cursor.fetchone() is None:

            query = "INSERT INTO Waitlist (account_id, patient_id, booked_dt) VALUES ( %s, %s, %s)"
            cursor.execute(query, [patientInfo["account_id"],
                           patientInfo["patient_id"], datetime.datetime.now()])
            conn.commit()

            return jsonify({"message": "You have been added to the waitlist"}), 200

        else:
            return jsonify({"message": "You are already in the waitlist"}), 400


@app.route('/', methods=["DELETE"])
@jwt_required()
def remove_from_waitlist():
    username = get_jwt_identity()
    waitlistId = request.json.get("waitlistId", None)

    with get_conn() as conn:
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(
            "SELECT is_doctor, account_id FROM Account WHERE username = %s", [username])
        user = cursor.fetchone()

        if (user["is_doctor"] is True):
            cursor.execute(
                "DELETE FROM Waitlist where waitlist_id = %s ", [waitlistId])
            return jsonify({"message": f"Patient {waitlistId} removed from waitlist"}), 200
        else:
            cursor.execute(
                "DELETE FROM Waitlist where account_id = %s ", [user["account_id"]])
            return jsonify({"message": f"You've been removed from waitlist"}), 200


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
    app.run(debug=True, host="0.0.0.0", port=5002)
