FROM node:14.15.0-alpine3.12 AS build
WORKDIR /build_app

<<<<<<< HEAD
COPY package.json ./
COPY yarn.lock ./
=======
COPY package*.json ./
>>>>>>> eb93437... Added dockerfile and dockercompose
RUN yarn install --frozen-lockfile

COPY . .
ENV NODE_ENV=production

RUN yarn next:build

FROM node:14.15.0-alpine3.12 AS prod
WORKDIR /app
ENV NODE_ENV=production

<<<<<<< HEAD
COPY --from=build ./build_app/ .

EXPOSE 3000
=======
COPY --from=build . .

EXPOSE 3000
RUN yarn db:runmigrations 

CMD ["yarn", "start"]
>>>>>>> eb93437... Added dockerfile and dockercompose
