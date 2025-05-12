# ----------- Stage 1: Build frontend -----------
FROM node:18 as frontend
WORKDIR /app
COPY web/ ./web
WORKDIR /app/web
RUN npm install && npm run build

# ----------- Stage 2: Setup backend -----------
FROM python:3.10-slim
WORKDIR /app

# Copy backend
COPY backend/ ./backend

# Copy built frontend
COPY --from=frontend /app/web/dist ./web_dist

# Install Python deps
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port (sesuai backend)
EXPOSE 8000

# Run backend, pastikan backend bisa sajikan file frontend (di web_dist)
CMD ["uvicorn", "backend.run:app", "--host", "0.0.0.0", "--port", "8000"]
