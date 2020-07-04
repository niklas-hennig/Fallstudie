FROM node:12.18.2 AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

#Setup enviroment
COPY ./react-app/package.json ./
COPY ./react-app/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

COPY ./react-app/. ./

RUN npm run-script build

FROM node:12.18.2

WORKDIR /usr/src/app

COPY ./api/package.json ./
COPY ./api/package-lock.json ./

RUN npm install

COPY ./api/. .

WORKDIR /usr/src/react-app/build

COPY --from=build /app/build/. .

EXPOSE 80

WORKDIR /usr/src/app

ENV DB_host "db"
ENV NODE_PORT 80

CMD ["node", "server.js"]
