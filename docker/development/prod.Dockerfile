FROM node:22-alpine AS builder

# Habilitar Corepack y configurar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

ENV WATCHPACK_POLLING=true
# ENV NODE_ENV=development


# RUN pnpm run build 

# FROM builder AS production
# # Copiar solo los archivos necesarios para producción
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/package.json ./package.json


# Exponer el puerto de la aplicación
EXPOSE 3000
CMD ["pnpm", "dev"]


# FROM node:22-alpine

# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
#   # Allow install without lockfile, so example works even without Node.js installed locally
#   else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
#   fi

# COPY src ./src
# COPY public ./public
# COPY next.config.ts .
# COPY tsconfig.json .

# # Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line to disable telemetry at run time
# # ENV NEXT_TELEMETRY_DISABLED 1

# # Note: Don't expose ports here, Compose will handle that for us

# # Start Next.js in development mode based on the preferred package manager
# COPY start-dev.sh .
# RUN chmod +x start-dev.sh
# CMD ["./start-dev.sh"]