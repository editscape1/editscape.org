# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . /app/

# Expose the port (FastAPI default for this project)
EXPOSE 10000

# Start the app with uvicorn (FastAPI)
CMD ["uvicorn", "AARPITA_EDITWEB.run:app", "--host", "0.0.0.0", "--port", "10000"] 