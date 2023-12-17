
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL=https://bsfuqkjusmgewiwsbszo.supabase.co
ENV NEXT_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZnVxa2p1c21nZXdpd3Nic3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3MTcwNjEsImV4cCI6MjAxODI5MzA2MX0.oqLneVo3AhHkuekfO_QZUdPu06md5MxK34UCM3VvA7k

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]