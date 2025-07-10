# Step 1: Build React frontend
FROM node:18 AS frontend-build
WORKDIR /app
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY index.html ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# Step 2: Build Python backend
FROM python:3.11-slim AS backend
WORKDIR /app

# Install Python dependencies
COPY AARPITA_EDITWEB/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY AARPITA_EDITWEB/ .

# Copy built frontend into backend's public directory for Flask static serving
COPY --from=frontend-build /app/dist ./AARPITA_EDITWEB/public

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Expose port 5000 for Flask
EXPOSE 5000

# Run Flask app
CMD ["flask", "run", "--host=0.0.0.0"] 