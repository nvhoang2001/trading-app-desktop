import { EDBTable } from "@/constants/db";
import { dbConnection } from "./database";

export async function initDB() {
    try {
        await dbConnection.initialize();
        await dbConnection.manager.query(`SELECT * from ${EDBTable.User}`);
    } catch (error) {
        console.log("DB connect error occurs: ", error);
        if (
            (error as Error).message.startsWith("SQLITE_ERROR: no such table:")
        ) {
            dbConnection.synchronize();
        }
    }
}
