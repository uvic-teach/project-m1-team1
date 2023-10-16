CREATE TABLE Account(
    AccountId INT IDENTITY PRIMARY KEY
    ,Username VARCHAR(255) NOT NULL
    ,Password VARCHAR(255) NOT NULL
);

CREATE TABLE Patient(
    PatientId INT IDENTITY PRIMARY KEY
    ,AccountId INT NOT NULL
    ,Username VARCHAR(255) NOT NULL
    ,Name VARCHAR(255) NOT NULL
    ,Age INT NOT NULL
    ,Address VARCHAR(255) NOT NULL
    ,Phone VARCHAR(255) NOT NULL
    ,CreatedTimestamp DATETIME NOT NULL
    ,CONSTRAINT fk_patient FOREIGN KEY (AccountId) REFERENCES Account(AccountId)
);

CREATE TABLE Triage(
    TriageId INT IDENTITY PRIMARY KEY
    ,PatientId INT NOT NULL
    ,AccountId INT NOT NULL
    ,Symptom1 BIT
    ,Symptom2 BIT
    ,Symptom3 BIT
    ,Condition1 BIT
    ,Condition2 BIT
    ,Condition3 BIT
    ,Outcome VARCHAR(255)
    ,CreatedTimestamp DATETIME
    ,CONSTRAINT fk_triage1 FOREIGN KEY (AccountId) REFERENCES Account(AccountId)
    ,CONSTRAINT fk_triage2 FOREIGN KEY (PatientId) REFERENCES Patient(PatientId)
);

CREATE TABLE Waitlist(
    WaitlistId INT IDENTITY PRIMARY KEY
    ,AccountId INT NOT NULL
    ,PatientId INT NOT NULL
    ,BookedDatetime DATETIME
    ,CONSTRAINT fk_waitlist1 FOREIGN KEY (AccountId) REFERENCES Account(AccountId)
    ,CONSTRAINT fk_waitlist2 FOREIGN KEY (PatientId) REFERENCES Patient(PatientId)
);

INSERT INTO Account(Username, Password) VALUES
    ('test@email.com', 'test')
    ,('doctor@email.com', 'doctor')
    ,('nurse@email.com', 'nurse')
    ;

INSERT INTO Patient(AccountId, Username, Name, Age, Address, Phone, CreatedTimestamp) VALUES
    (
        1,
        'test@email.com',
        'test',
        42,
        'test rd., victoria',
        '999-999-9999',
        CAST(GETDATE() as datetime)
    )

INSERT INTO Triage (AccountId, PatientId, Symptom1 ,Symptom2, Symptom3 ,Condition1 ,Condition2 ,Condition3, Outcome ,CreatedTimestamp)
VALUES (
        1,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'You\'re Okay',
        CAST(GETDATE() as datetime)
    )

