# ---------- Stage 1: Build Frontend ----------
FROM node:18 as frontend

WORKDIR /app/web
COPY web/ ./
RUN npm install && npm run build

# ---------- Stage 2: Run Backend ----------
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching layer)
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./backend

# Copy frontend built output
COPY --from=frontend /app/web/dist ./web_dist

# Set working directory to backend
WORKDIR /app/backend

# Set ENV flags
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/backend

# Expose port
EXPOSE 8000

# Run app from run.py (which imports app from api.ai_response)
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
