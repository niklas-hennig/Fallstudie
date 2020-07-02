FROM postgres:latest AS base

RUN echo "fetched"

# Database setup
# Changes to the DB structure shold be made inside DB_Setup.sql
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker
ENV REST_PORT 2001
ENV POSTGRES_PORT 5432

ADD ./DB_Setup.sql /docker-entrypoint-initdb.d/

EXPOSE ${REST_PORT}
EXPOSE ${POSTGRES_PORT}