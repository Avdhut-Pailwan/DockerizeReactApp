FROM node:22-alpine AS build_image

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production_image

WORKDIR /frontend

COPY --from=build_image /frontend/dist ./dist


COPY package.json .
COPY vite.config.js .

RUN npm i vite

EXPOSE ${VITE_PORT}

CMD npm run preview