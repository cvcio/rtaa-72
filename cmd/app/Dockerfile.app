FROM node:lts-alpine as build-stage

WORKDIR /app

COPY cmd/app/package.json cmd/app/yarn.lock /app/
COPY cmd/app/.env /app/.env
COPY cmd/app/ /app

# RUN apk add python make gcc g++
RUN yarn
EXPOSE 8080
CMD ["yarn", "serve"]
