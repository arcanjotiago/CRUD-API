# Description
This repository was created to implement a CRUD API with Typescript, Node.js, Express and PostgreSQL.

# Endpoints
- `GET`  /status
- `GET`  /users
- `GET`  /users/:id
- `POST` /users
- `DEL`  /users/:id
- `PUT`  /users/:id 

*`*` `PUT /users/:id` update user from database. (Just name and password)*.

# Installation
> Before your install modules and dependencies, you must setup the `.env` file and execute query on file `src\database\users_table_Schema.sql` in you database to setup users table.


```
npm install
```

# Running the app
## Development
```
npm run start-dev
```

## Production
```
npm run start
```
