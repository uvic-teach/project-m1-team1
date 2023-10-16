# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /waitlist-microservice

# Install packages
RUN apk --no-cache add curl gnupg gcc g++ unixodbc-dev

# Download MSSQL drivers
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.10.4.1-1_amd64.apk
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.10.1.1-1_amd64.apk

# Install MSSQL drivers
RUN apk add --allow-untrusted msodbcsql17_17.10.4.1-1_amd64.apk
RUN apk add --allow-untrusted mssql-tools_17.10.1.1-1_amd64.apk

# Download dependencies 
COPY requirements.txt requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

# Copy the source code into the container.
COPY . .

# Run the application.
EXPOSE 5002
CMD [ "python3", "app.py"]
