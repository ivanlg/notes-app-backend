FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies (including dev deps needed for ts-node)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build the application
RUN npm run build

CMD ["npm", "run", "start:prod"]
