from dotenv import load_dotenv
from flask import Flask, request
import pyodbc
import os

app = Flask(__name__)

connection_string = os.getenv('AZURE_SQL_CONNECTIONSTRING')

@app.route("/triage/user", methods=["POST"])
def create_user():
    with get_conn() as conn:
        cursor = conn.cursor()
        
        data = request.get_json()
        name = data["name"]
        email = data["email"]

        cursor.execute(f"INSERT INTO Users (name, email) VALUES (?, ?)", (name, email))
        conn.commit()

        return {"name": name, "email": email, "message": f"User {email} created."}, 201


@app.route("/triage/user", methods=["GET"])
def get_all_users():
    data = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Users")

        columns = [column[0] for column in cursor.description]
        
        for row in cursor.fetchall():
            data.append(dict(zip(columns, row)))
    
    return data


def get_conn():
    return pyodbc.connect(os.getenv('AZURE_SQL_CONNECTIONSTRING'))


if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0")