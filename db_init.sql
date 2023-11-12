CREATE TABLE Account(
    account_id SERIAL PRIMARY KEY
    ,username VARCHAR(255) NOT NULL
    ,password VARCHAR(255) NOT NULL
    ,is_doctor BOOLEAN
);

CREATE TABLE Patient(
    patient_id SERIAL PRIMARY KEY
    ,account_id INT NOT NULL
    ,username VARCHAR(255) NOT NULL
    ,name VARCHAR(255) NOT NULL
    ,age INT NOT NULL
    ,address VARCHAR(255) NOT NULL
    ,phone VARCHAR(255) NOT NULL
    ,created_timestamp TIMESTAMPTZ NOT NULL
    ,CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

CREATE TABLE Triage(
    triage_id SERIAL PRIMARY KEY
    ,patient_id INT NOT NULL
    ,account_id INT NOT NULL
    ,symptom_1 BOOLEAN
    ,symptom_2 BOOLEAN
    ,symptom_3 BOOLEAN
    ,condition_1 BOOLEAN
    ,condition_2 BOOLEAN
    ,condition_3 BOOLEAN
    ,outcome VARCHAR(255)
    ,created_timestamp TIMESTAMPTZ
    ,CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES Account(account_id)
    ,CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE Waitlist(
    waitlist_id SERIAL PRIMARY KEY
    ,account_id INT NOT NULL
    ,patient_id INT NOT NULL
    ,booked_dt TIMESTAMPTZ
    ,CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES Account(account_id)
    ,CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

INSERT INTO Account(username, password, is_doctor) VALUES
    ('test', 'test', NULL)
    ,('doctor', 'doctor', TRUE)
    ,('nurse', 'nurse', TRUE)
    ;

INSERT INTO Patient(account_id, username, name, age, address, phone, created_timestamp) VALUES
    (
        1,
        'test',
        'test',
        42,
        'test rd., victoria',
        '999-999-9999',
        NOW()
    );

INSERT INTO Triage (account_id, patient_id, symptom_1, symptom_2, symptom_3, condition_1, condition_2, condition_3, outcome, created_timestamp)
VALUES (
        1,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'You''re Okay',
        NOW()
    );

