FROM postgres:latest

# Database setup
# Changes to the DB structure shold be made inside DB_Setup.sql
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker

RUN mkdir -p setup

ADD setup/DB_Setup.sql /docker-entrypoint-initdb.d/


# Node.js setup including npm (may take a while, installing about 300 packages)
COPY setup/package.json /setup/
COPY setup/server.js setup/

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm 

# Npm Package setup
RUN npm install express pg

# ENTRYPOINT [ "node", "setup/server.js" ]