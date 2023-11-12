# Team 1 - The One Piece

## ~~Azure~~ Digital Ocean Deployment Domains
- https://auth-microservice-l5b7m.ondigitalocean.app/ ~~`seng350-team1-auth.azurewebsites.net`~~
- https://triage-microservice-kc8mi.ondigitalocean.app/ ~~`seng350-team1-triage.azurewebsites.net`~~
- https://waitlist-microservice-nquae.ondigitalocean.app/ ~~`seng350-team1-waitlist.azurewebsites.net`~~
> ~~**NOTE:** Our Azure database is set to sleep after 1-hour of idling. Please wait a minute or two if the first request fails, the database is "waking up".~~

### Available Credentials
|username|password|
|--------|--------|
|test    |test    |
|test2   |test    |
|doctor  |doctor  |

## Run Locally

> **NOTE:** You must create a `.env` file in each of the microservices folder - this file must contain `database credentials` and `JWT_SECRET_KEY`

Build the project
```
docker-compose build
```
Run the project
```
docker-compose up
```
