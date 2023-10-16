# Team 1 - The One Piece

## Azure Deployment Domains
- `seng350-team1-auth.azurewebsites.net`
- `seng350-team1-triage.azurewebsites.net`
- `seng350-team1-waitlist.azurewebsites.net`


## Run Locally

> **NOTE:** You must create a `.env` file in `./auth-microservice` and `./triage-microservice` specifying the `AZURE_SQL_CONNECTIONSTRING` and `JWT_SECRET_KEY`.

```
docker build -t auth-microservice:latest -f ./auth-microservice/Dockerfile ./auth-microservice
```

```
docker build -t triage-microservice:latest -f ./triage-microservice/Dockerfile ./triage-microservice
```

```
docker build -t waitlist-microservice:latest -f ./waitlist-microservice/Dockerfile ./waitlist-microservice
```

```
docker-compose up
```
