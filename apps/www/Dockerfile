FROM node:20-alpine AS base_node_pnpm
# Install pnpm globally
RUN npm install -g pnpm

# Stage 1: Install dependencies
FROM base_node_pnpm AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base_node_pnpm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Stage 3: Production server
# Use a slim Node.js image for the runner stage as pnpm is not needed here.
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# Next.js standalone output typically includes a server.js in the standalone directory.
CMD ["node", "server.js"]