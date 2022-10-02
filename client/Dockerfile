FROM node:lts-alpine3.15

WORKDIR /frontend

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
# COPY postcss.config.js postcss.config.js
# COPY tailwind.config.js tailwind.config.js

COPY public public

RUN npm install
