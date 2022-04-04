FROM node:16-alpine AS build
WORKDIR /build_app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ENV NODE_ENV=production

RUN yarn next:build

FROM node:16-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build ./build_app/ .

EXPOSE 3000
