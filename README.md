In order to run project locally, you need to have installed:
- nodejs v16 (suggest to use nvm)
- docker

# Getting started:
- clone the repo
- cd into the root folder
- install npm dependencies with `npm i`

## Backend
In order to run mysql db on docker run `docker-compose up -d` from the root folder

In order to run db migrations and seeds -
1. cd apps/backend
2. run `npx knex migrate:latest`
3. run `npx knex seed:run`

OR run `npm run db:local` from the root folder - it will spin-up docker-compose and run db migrations and seeds

In order to run NodeJS/Express server locally - run `npx nx serve backend` - server will start on `http://localhost:3333`

- run `knex migrate:make migration_name` from apps/backend folder to create a new migration
- run `knex migrate:latest` from apps/backend folder to apply all migrations
- run `knex migrate:rollback --all` from apps/backend folder to rollback all migrations
- run `knex seed:make seed_name` from apps/backend folder to create a new seed
- run `knex seed:run` from apps/backend folder to apply all seeds

For more info regarding knex ORM check docs: https://knexjs.org/

---

## Frontend
In order to run frontend locally - run `npx nx serve frontned` from the project root folder - fronend will start on `http://localhost:4200`