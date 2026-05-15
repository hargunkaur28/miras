FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

# Build
RUN npm run build

# Expose port for preview
EXPOSE 4173

# Serve the built app
CMD ["npm", "run", "preview"]
