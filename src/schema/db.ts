import { createConnection } from "typeorm";
import { Users } from "../Entities/Users";

export const connectDb = async () => {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 33060,
        username: "root",
        password: "102030",
        database: 'usersdb',

        entities: [
            Users
        ],
        synchronize: true,
        ssl: false,
    });

};