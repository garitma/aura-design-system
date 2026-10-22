# Build from monorepo root:
#   docker build -f packages/registry/Dockerfile -t aura-stories .
#
# Static Ladle site (`pnpm ladle build -o build`) served on port 3000.

FROM node:22.23.4-alpine AS base
ENV PNPM_HOME="/pnpm"
# pnpm 10 keeps global bins in PNPM_HOME; newer pnpm uses PNPM_HOME/bin.
ENV PATH="$PNPM_HOME:$PNPM_HOME/bin:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable && corepack prepare pnpm@10.2.1 --activate
RUN pnpm add -g turbo

# Stage 1: Prune the monorepo to the registry package (Ladle stories).
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune @aura-design/registry --docker

# Stage 2: Install dependencies from the pruned lockfile.
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Stage 3: Ladle static build (package script: ladle build -o build).
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN turbo run build --filter=@aura-design/registry

# Stage 4: Serve the static story shell.
FROM nginx:1.27-alpine AS runner
ENV PORT=3000
RUN rm -f /etc/nginx/conf.d/default.conf
COPY packages/registry/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/packages/registry/build /usr/share/nginx/html
EXPOSE 3000
