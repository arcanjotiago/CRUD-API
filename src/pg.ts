import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: "600650",
    port: 5433, // or the port you are using for PostgreSQL
});

export default pool;