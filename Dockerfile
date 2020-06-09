FROM postgres:latest AS base

# Database setup
# Changes to the DB structure shold be made inside DB_Setup.sql
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker
ENV REST_PORT 2001
ENV POSTGRES_PORT 5432

ADD setup/DB_Setup.sql /docker-entrypoint-initdb.d/


# Node.js setup including npm (may take a while, installing about 300 packages)
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm 
RUN npm install react-scripts@3.0.1 -g
RUN npm install forever -g

# Setup React-App
WORKDIR /app/react-app
ENV PATH /app/react-app/node_modules/.bin:$PATH

COPY react-app/package.json /app/react-app/package.json
RUN npm install


COPY react-app/. /app/react-app

RUN npm run build

#Setup Express Node.js Backend
WORKDIR /app/api

COPY api/package.json /api/package.json
RUN npm install

COPY api/. /app/api


# Setup Nginx Server
RUN apt install nginx -y

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -r /var/www/html/*

RUN mv /app/react-app/build/* /var/www/html/

EXPOSE 80
EXPOSE 443
EXPOSE ${REST_PORT}
EXPOSE ${POSTGRES_PORT}

