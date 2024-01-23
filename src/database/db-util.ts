import { Pool } from "pg";
import dotenv from 'dotenv'; 
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "users",
    port: Number(process.env.DB_PORT), 
}

const pool = new Pool(dbConfig);

export default pool;