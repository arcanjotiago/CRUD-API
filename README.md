# Description
This repository was created to implement a CRUD API with Typescript, Node.js, Express and PostgreSQL.

# Endpoints
- `GET`  /status
- `GET`  /users
- `GET`  /users/:id
- `POST` /users
- `PUT`  /users/:id 
- `DEL`  /users/:id

*`*` `PUT /users/:id` update user from database. (Just name and password)*.

## Requisition examples
`POST` /users
```
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "admin",
    "email": "admin@example.com",
    "password": "000000"
}'
```

`PUT`  /users/:id 
```
curl --location --request PUT 'http://localhost:3000/users/d65b64d0-0176-4266-a35e-2f58f8c7d986' \
--header 'Content-Type: application/json' \
--data '{
    "name": "updateadmin",
    "password": "000001"
}'
```

# Installation
> Before your install modules and dependencies, you must setup the `.env` file and execute query on file `src\database\users_table_Schema.sql` in you database to setup users table.


```
npm install
```

# Running the app
## Development
```
npm run start:dev
```

## Production
```
npm run start
```