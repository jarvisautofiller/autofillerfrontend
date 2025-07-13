# Use official Node.js v20 image on Alpine
FROM node:20-alpine3.18

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install app dependencies + Babel plugin fix
RUN npm install && npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copy the rest of your source files
COPY . .

# Disable sourcemap generation to reduce memory usage
ENV GENERATE_SOURCEMAP=false

# Increase Node's memory limit to avoid heap crash
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Expose app port — update if different
EXPOSE 3000

# Run your production start command
CMD ["npm", "run", "start:prod"]
