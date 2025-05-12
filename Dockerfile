# ----------- Stage 1: Build Frontend with Vite -----------
FROM node:18 AS frontend
WORKDIR /app/web
COPY web/ .
RUN npm install && npm run build

# ----------- Stage 2: Build Backend with FastAPI -----------
FROM python:3.10-slim AS backend

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend code
COPY backend/ ./backend
COPY backend/requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy run.py to root
COPY run.py ./

# Copy frontend build to serve as static assets
COPY --from=frontend /app/web/dist ./web_dist

# Expose the FastAPI app port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]
