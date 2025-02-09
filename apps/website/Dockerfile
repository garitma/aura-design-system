# Base image for the application, using Node.js 18 with Alpine for a lightweight setup
FROM node:22-alpine AS base

# Define build-time arguments for Turbo and pnpm versions
ARG TURBO_VERSION=2.0.11
ARG PNPM_VERSION=10.2.1

# Set environment variable for pnpm installation directory
ENV PNPM_HOME=/usr/local/bin

# Install pnpm using npm
RUN npm install -g pnpm@$PNPM_VERSION

# Builder stage: Prepares and builds the application
FROM base AS builder

# Update Alpine package manager and install compatibility libraries
RUN apk update && apk add --no-cache libc6-compat

# Set the working directory for the build process
WORKDIR /app

# Install Turbo globally for managing monorepos and caching builds
RUN pnpm add -g turbo@${TURBO_VERSION}

# Copy necessary project files for dependency installation and build
COPY package.json . 
COPY pnpm-lock.yaml . 
COPY pnpm-workspace.yaml . 
COPY tsconfig.json . 
COPY turbo.json . 
COPY apps/website/. apps/website/.

# Prune the monorepo to include only the required dependencies for the target app
RUN turbo prune @aura-design/website --docker

# Install dependencies using pnpm, leveraging caching for faster builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the application with Turbo, filtering for the target app
RUN turbo build --filter=@aura-design/website...

# Runner stage: Prepares the runtime environment for the application
FROM base AS runner

# Set the working directory for the runtime container
WORKDIR /app

# Create a non-root user and group for running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy application-specific files from the builder stage to the runtime container
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/next.config.ts .
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/package.json .
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static

# Ensure the cache directory is writable by the nextjs user
RUN mkdir -p /app/apps/website/.next/cache && chown -R nextjs:nodejs /app/apps/website/.next

# Switch to the non-root user for security best practices
USER nextjs

# Define the command to run the application
CMD node apps/website/server.js