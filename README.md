# Team 1 - The One Piece

## Digital Ocean Deployment Domains
- Microservices
  - https://auth-microservice-l5b7m.ondigitalocean.app/
  - https://triage-microservice-kc8mi.ondigitalocean.app/
  - https://waitlist-microservice-nquae.ondigitalocean.app/
- Frontend
  - https://mister-ed-laexc.ondigitalocean.app/


### Available Credentials
|username|password|
|--------|--------|
|test    |test    |
|test2   |test    |
|doctor  |doctor  |
|nurse   |nurse   |

## Run Locally

> **NOTE:** You must create a `.env` file in each of the microservices folder - this file must contains the `database credentials` and `JWT_SECRET_KEY`

Build the project
```
docker-compose build
```
Run the project
```
docker-compose up
```
