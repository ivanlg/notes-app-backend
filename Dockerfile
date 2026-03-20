FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools for native modules
RUN apk add --no-cache python3 make g++ git

# Install dependencies (including dev deps) and build the app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built assets and any static files needed at runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public_certs ./public_certs

EXPOSE 3000

CMD ["node", "dist/main"]
