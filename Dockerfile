FROM postgres:latest

# Database setup
# Changes to the DB structure shold be made inside DB_Setup.sql
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker
ENV POSTGRES_PORT 5432

EXPOSE ${POSTGRES_PORT}

ADD setup/DB_Setup.sql /docker-entrypoint-initdb.d/


# Node.js setup including npm (may take a while, installing about 300 packages)
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm 

# Setup React-App
WORKDIR /app/react-app
ENV PATH /app/react-app/node_modules/.bin:$PATH

COPY react-app/package.json /app/react-app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY react-app/. /app/react-app

#Setup Express
WORKDIR /app/api

COPY api/package.json /app/api/package.json
RUN npm install

COPY api/. /app/api

# Setup common Npm-Project
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

