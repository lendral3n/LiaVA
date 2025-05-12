# ----------- Stage 1: Build frontend -----------
FROM node:18 as frontend
WORKDIR /app
COPY web/ ./web
WORKDIR /app/web
RUN npm install && npm run build

# ----------- Stage 2: Setup backend -----------
# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Salin requirements dan install
COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file ke container
COPY . .

# Expose port (ganti jika tidak pakai 8000)
EXPOSE 8000

# Jalankan aplikasi
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
