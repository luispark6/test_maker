# Stage 1: Build dependencies
FROM python:3.9 AS builder
# Set the working directory
WORKDIR /code
# Copy all code to /code/app
COPY . /code/app

# Install backend requirements
RUN pip3 install --no-cache-dir --upgrade -r /code/app/requirements.txt
# Stage 2: Create the final image
FROM python:3.9-slim

# Set the working directory
WORKDIR /code/app

# Copy the code and installed dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /code /code
# Set the entry point for FastAPI using Uvicorn

# Update package list and install poppler-utils
RUN apt-get update && \
    apt-get install -y poppler-utils && \
    rm -rf /var/lib/apt/lists/*

CMD ["fastapi", "run", "main.py","--port", "80"]