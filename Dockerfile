# syntax=docker/dockerfile:1

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app

# npm ci requires a committed package-lock.json.
# If this repo has no lockfile, replace the two lines below with:
#   COPY package.json ./
#   RUN npm install --no-audit --no-fund
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---------- builder ----------
FROM node:22-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Requires `output: 'standalone'` in next.config.mjs / next.config.js
RUN npm run build

# ---------- runner ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# 8080 to match the Devtron chart's containerPort named "app"
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001

# Remove this line if the repo has no ./public directory
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]
