## Setting a reverse proxy for the development mode.

Add the next line into your hosts file:

    127.0.0.1       dev.moi.salon

Build a nginx docker image and run the container:

    docker-compose up -d

## Set up relay-compiler

Install packages:

    yarn

Fetch current GraphQL schema:

    yarn fetch-schema

Install Watchman:

    <https://facebook.github.io/watchman/docs/install.html>

Watch for file changes in source code and schema:

    yarn relay --watch


Now you are ready to run the application:

    yarn start
