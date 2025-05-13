# ---------- Backend Only ----------
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements & install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY backend/ ./backend
WORKDIR /app/backend

# ENV
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/backend

# Expose FastAPI port
EXPOSE 8000

# Run your backend
CMD ["python", "run.py"]
