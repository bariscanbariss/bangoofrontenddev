# ========================================
# Bangoo Frontend - Multi-stage Dockerfile
# ========================================
# Optimized for Next.js standalone output
# Target: 2,000-5,000 concurrent users
# ========================================

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./

# Install dependencies based on lock file
RUN \
  if [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  else \
    echo "No lockfile found." && npm install; \
  fi

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy deps from stage 1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG REVALIDATE_WINDOW

# Set build-time environment variables
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV REVALIDATE_WINDOW=$REVALIDATE_WINDOW

# Enable standalone output for Docker
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN \
  if [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm build; \
  elif [ -f yarn.lock ]; then \
    yarn build; \
  else \
    npm run build; \
  fi

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "server.js"]
