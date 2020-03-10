FROM postgres:9.3

ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker

RUN mkdir -p setup

ADD DB_Setup.sql /docker-entrypoint-initdb.d/

