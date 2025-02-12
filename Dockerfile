# Step 1: Use official Node.js image as base
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm ci --omit=dev

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the Next.js application in standalone mode
RUN npm run build

# Step 7: Move the `static` folder into `standalone/.next/`
RUN mkdir -p .next/standalone/.next && mv .next/static .next/standalone/.next/static

# Step 8: Use a lightweight runtime for production
FROM node:18-alpine AS runner

# Step 9: Set working directory
WORKDIR /app

# Step 10: Copy standalone build files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# Step 11: Expose application port
EXPOSE 3000

# Step 12: Start the standalone Next.js server
CMD ["node", "server.js"]
