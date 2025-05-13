# ---------- Build Stage ----------
FROM node:18 as builder

WORKDIR /app

# Salin semua file project frontend
COPY . .

# Inject ENV saat build (Vite membaca ini saat build, bukan saat runtime)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Install dan build
RUN npm install && npm run build

# ---------- Serve Stage ----------
FROM node:18

WORKDIR /app

# Install vite-preview server secara global
RUN npm install -g vite

# Copy hasil build ke container
COPY --from=builder /app/dist /app/dist

# Expose port default vite preview
EXPOSE 4173

# Jalankan preview server dari folder dist
CMD ["vite", "preview", "--host"]
