# Build stage
FROM node:16-alpine AS build
WORKDIR /usr/app
COPY package*.json ./
# Install build-essentials - https://github.com/mhart/alpine-node/issues/27#issuecomment-390187978
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && yarn install
COPY . .
RUN yarn build

# App stage
FROM node:16-alpine as app
WORKDIR /usr/app
COPY package*.json ./
ENV NODE_ENV=production
# Install build-essentials - https://github.com/mhart/alpine-node/issues/27#issuecomment-390187978
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && yarn install --production \
 && apk del .build-deps

COPY --from=build /usr/app/target ./

CMD node index.js
