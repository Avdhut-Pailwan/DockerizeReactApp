FROM node:22-alpine

WORKDIR /backend

COPY package.json .

RUN npm install --production

COPY . .

EXPOSE ${BACKEND_PORT}

CMD ["npm", "start"]
