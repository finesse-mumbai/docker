# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the app port
EXPOSE 3000

# Run migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
