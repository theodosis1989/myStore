FROM node:12.20.1 AS builder

ENV INSTALL_PATH /app

WORKDIR $INSTALL_PATH

COPY yarn.lock package.json ./
RUN yarn install

COPY . $INSTALL_PATH

RUN yarn clean
RUN yarn build

FROM node:alpine

RUN apt-get update
RUN apt-get install

ENV INSTALL_PATH /app
WORKDIR $INSTALL_PATH

COPY yarn.lock package.json ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist

CMD yarn start