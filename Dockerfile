# syntax=docker/dockerfile:1.7

# Multi-stage Dockerfile for a Next.js 16 app using `output: "standalone"`.
# See node_modules/next/dist/docs/01-app/02-guides/self-hosting.md
# and node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md

ARG NODE_VERSION=22-alpine

# ---- deps: install production-ready node_modules ----
FROM node:${NODE_VERSION} AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the Next.js app ----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ---- runner: minimal runtime image ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Standalone output already contains the minimal node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
