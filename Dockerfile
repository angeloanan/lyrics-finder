# Build stage
FROM node:14-alpine AS build
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm build

# App stage
FROM node:14-alpine as app
WORKDIR /usr/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --production

COPY --from=build /usr/app/target ./
VOLUME /usr/app/img

CMD node index.js
