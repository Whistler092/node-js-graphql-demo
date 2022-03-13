import { createConnection } from "typeorm";
import { Users } from "../Entities/Users";

import './config'
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from "./config";

export const connectDb = async () => {
    await createConnection({
        type: "mysql",
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,

        entities: [
            Users
        ],
        synchronize: true,
        ssl: false,
    });

};