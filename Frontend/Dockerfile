FROM node:22-alpine as build_image

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine as production_image

WORKDIR /frontend

COPY --from=build_image /frontend/dist ./dist


COPY package.json .
COPY vite.config.js .

RUN npm i vite

EXPOSE ${VITE_PORT}

CMD [ "npm", "run", "preview" ]