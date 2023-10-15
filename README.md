# How to run

> **NOTE:** You must create a `.env `file in `./auth-microservice` and `./triage-microservice` specifying the `AZURE_SQL_CONNECTIONSTRING` and `JWT_SECRET_KEY`.

```
docker build -t auth-microservice:latest -f ./auth-microservice/Dockerfile ./auth-microservice
```

```
docker build -t triage-microservice:latest -f ./triage-microservice/Dockerfile ./triage-microservice
```

```
docker-compose up
```