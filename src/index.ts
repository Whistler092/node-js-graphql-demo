import { PORT } from './schema/config';
import { connectDb } from './schema/db';
import app from "./app";


async function main() {

    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();