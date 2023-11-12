# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /waitlist-microservice

# Download dependencies 
COPY requirements.txt requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

# Copy the source code into the container.
COPY . .

# Run the application.
EXPOSE 5002
CMD [ "python3", "app.py"]
