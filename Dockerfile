# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the frontend using Vite
RUN npm run build

# Cloud Run will inject this port
ENV PORT=8080

# Expose that port for Cloud Run
EXPOSE 8080

# Start server with Vite preview
CMD ["npm", "run", "preview"]
