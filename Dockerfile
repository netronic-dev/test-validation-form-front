FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm i --force --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:19.6.1 AS runner
WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 5002
ENTRYPOINT ["npm", "start"]