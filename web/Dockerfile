# Stage 1: Build the Vite app
FROM node:18 as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve built app using 'serve'
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
