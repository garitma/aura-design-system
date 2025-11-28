# Build from monorepo root:
#   docker build -f apps/www/Dockerfile -t aura-www .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add -g turbo

# Stage 1: Prune the monorepo to only include the www app and its dependencies
FROM base AS pruner
WORKDIR /app

# Copy workspace config files first
COPY pnpm-lock.yaml pnpm-workspace.yaml turbo.json package.json ./

# Copy all package.json files for workspace resolution
COPY apps/www/package.json ./apps/www/
COPY packages/registry/package.json ./packages/registry/

# Copy full source for pruning
COPY . .

RUN turbo prune @aura-design/www --docker

# Stage 2: Install dependencies
FROM base AS installer
WORKDIR /app

# Copy lockfile and package.json files from pruned workspace
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies (ignore scripts since source files aren't available yet)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app

# Copy installed dependencies
COPY --from=installer /app/ .

# Copy source code from pruned workspace
COPY --from=pruner /app/out/full/ .

# Run postinstall scripts now that source is available, then build
RUN pnpm --filter @aura-design/www run postinstall && \
    turbo run build --filter=@aura-design/www

# Stage 4: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/.next/static ./apps/www/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/www/public ./apps/www/public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/www/server.js"]