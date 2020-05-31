# Build stage
FROM node:14-slim AS build
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# App stage
FROM node:14-alpine as app
WORKDIR /usr/app
COPY package*.json ./
ENV NODE_ENV=production
RUN yarn install --production

COPY --from=build /usr/app/target ./
VOLUME /usr/app/img

CMD node index.js
