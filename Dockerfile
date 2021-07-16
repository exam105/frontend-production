# Install dependencies only when needed
FROM node:lts AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /exam105-fe
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:lts AS builder
WORKDIR /exam105-fe
COPY . .
COPY --from=deps /exam105-fe/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:lts AS runner
WORKDIR /exam105-fe

# ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /exam105-fe/public ./public
COPY --from=builder /exam105-fe/.next ./.next
COPY --from=builder /exam105-fe/node_modules ./node_modules
COPY --from=builder /exam105-fe/package.json ./package.json


EXPOSE 8090

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
