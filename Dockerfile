FROM arm32v7/node:14-buster-slim

ENV LANG=C.UTF-8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start"]
