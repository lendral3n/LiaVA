# ----------- Stage 1: Build frontend -----------
FROM node:18 as frontend
WORKDIR /app/web
COPY web/ ./  # Salin folder `web`
RUN npm install && npm run build

# ----------- Stage 2: Backend (Python + FastAPI) -----------
FROM python:3.10-slim

# Working dir backend
WORKDIR /app

# Install sistem dependencies minimum
RUN apt-get update && apt-get install -y \
    gcc build-essential libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Salin requirement & install python packages
COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh backend
COPY backend/ ./backend/
COPY run.py .  # Jika kamu punya file run.py untuk uvicorn entry point

# Salin hasil build frontend
COPY --from=frontend /app/web/dist ./frontend-dist

# Environment (Railway akan inject ENV, tidak perlu copy .env)
ENV PORT=8000

# Expose port (Railway gunakan 8000 by default)
EXPOSE 8000

# Jalankan aplikasi FastAPI
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
