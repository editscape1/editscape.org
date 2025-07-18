# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY backend/ /app/

# Expose the port (FastAPI default for this project)
EXPOSE 10000

# Start the app with uvicorn (FastAPI)
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:10000"] 