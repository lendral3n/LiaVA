# ---------- Stage 1: Build ----------
FROM node:18 as builder
WORKDIR /app
COPY . .

# Inject ENV saat build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install && npm run build

# ---------- Stage 2: Preview server ----------
FROM node:18-slim
WORKDIR /app

# Install only runtime deps
COPY --from=builder /app /app
RUN npm install --omit=dev

EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]
