FROM node:14.15.0-alpine3.12 AS build
WORKDIR /build_app

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .
ENV NODE_ENV=production

RUN yarn next:build

FROM node:14.15.0-alpine3.12 AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build . .

EXPOSE 3000
RUN yarn db:runmigrations 

CMD ["yarn", "start"]