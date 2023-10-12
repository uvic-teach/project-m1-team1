# API Description

## auth
https://seng350-team1-auth.azurewebsites.net/

Endpoints:
- `/`
  - GET req 
  - Returns `message`
- `/login`
  - POST req with ```body: {"username": "test@email.com", "password": "test"}```
  - Returns `auth-token` or `401 - Unauthorized`
- `/register`
  - POST req with ```body: {"username": "test@email.com", "password": "test"}```
  - Returns `201 - Created`

## triage
https://seng350-team1-triage.azurewebsites.net/

Endpoints:
- `/`
  - GET req with `auth-token`
  - Returns `200` or `401`
- `/form`
  - GET req with `auth-token`
    - Returns lastest completed form
  - POST req with the following `body` and `auth-token`
```
{ 
    "Name":         (required) 
    "Age":          (required) 
    "Address":      (required)
    "Phone":        (required)
    "Symptom1": 
    "Symptom2": 
    "Condition1":  
    "Condition2":    
}
```