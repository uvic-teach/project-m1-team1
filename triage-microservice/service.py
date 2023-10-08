from dotenv import load_dotenv
from flask import Flask, jsonify, request
import psycopg2
import os

app = Flask(__name__)

conn = psycopg2.connect(
    database="seng350",
    host="localhost", port="5432",
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASSWORD')
)

cur = conn.cursor()

cur.execute(
    '''CREATE TABLE IF NOT EXISTS Users (id serial PRIMARY KEY\
        ,name varchar(80) not null\
        ,email varchar(200) not null);'''
)

cur.execute(
    '''INSERT INTO Users (name, email) VALUES ('Bob', 'bob@email.com')\
        ,('Jon', 'jon@gmail.com')\
        ,('Ed', 'ed@outlook.com')\
        ,('Bruce', 'bruce@icloud.com');'''
)

conn.commit()

print("DB CREATED")

cur.close()
conn.close()


@app.route("/api/user", methods=["POST"])
def create_user():
    conn = psycopg2.connect(
        database="seng350",
        host="localhost", port="5432",
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD')
    )
    cur = conn.cursor()
    
    data = request.get_json()
    name = data["name"]
    email = data["email"]

    cur.execute(
        '''INSERT INTO Users (name, email) VALUES (%s, %s)''', (name, email)
    )
    conn.commit()

    cur.close()
    conn.close()
    
    return {"name": name, "email": email, "message": f"User {email} created."}, 201

@app.route("/api/user", methods=["GET"])
def get_all_users():
    conn = psycopg2.connect(
        database="seng350",
        host="localhost", port="5432",
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD')
    )
    cur = conn.cursor()

    cur.execute(
        '''SELECT * FROM Users'''
    )
    data = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify(data)

if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, host="0.0.0.0")