# Use official Node.js image as the base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package and config files
COPY package*.json ./
COPY tsconfig.* ./
COPY vite.config.* ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Build the application
RUN npm run build

# -----------------------
# Production image
# -----------------------
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for nginx)
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
