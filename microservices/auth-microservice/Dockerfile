# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /auth-microservice

# # Install packages
# RUN apk --no-cache add curl gnupg gcc g++ unixodbc-dev

# # Download MSSQL drivers
# RUN curl -O https://download.microsoft.com/download/3/5/5/355d7943-a338-41a7-858d-53b259ea33f5/msodbcsql18_18.3.2.1-1_amd64.apk
# RUN curl -O https://download.microsoft.com/download/3/5/5/355d7943-a338-41a7-858d-53b259ea33f5/mssql-tools18_18.3.1.1-1_amd64.apk

# # Install MSSQL drivers
# RUN apk add --allow-untrusted msodbcsql18_18.3.2.1-1_amd64.apk
# RUN apk add --allow-untrusted mssql-tools18_18.3.1.1-1_amd64.apk

# Download dependencies 
COPY requirements.txt requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

# Copy the source code into the container.
COPY . .

# Run the application.
EXPOSE 5000
CMD [ "python3", "app.py"]
