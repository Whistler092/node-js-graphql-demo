import { connectDb } from './schema/db';
import app from "./app";


async function main() {

    try {
        await connectDb();

        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    } catch (error) {
        console.log(error);
    }
}

main();