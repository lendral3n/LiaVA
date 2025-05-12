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

# Copy backend code
COPY backend/ ./backend

# Copy built frontend
COPY --from=frontend /app/web/dist ./web_dist

# Copy requirements & install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Set env (Railway akan inject otomatis .env di runtime)
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Run FastAPI app
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
