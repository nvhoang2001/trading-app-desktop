import path from "path";
import fs from "fs/promises";
export class FileLogger {
    filePath: string;

    constructor(filename: string) {
        this.filePath = path.resolve(__dirname, "log", filename);

        fs.access(this.filePath, fs.constants.F_OK).catch((error) => {
            fs.mkdir(path.resolve(__dirname, "log"), {
                recursive: true,
            });
        });
    }

    async saveData(data: object | string) {
        const storedLog =
            typeof data === "object" ? JSON.stringify(data) : data;
        try {
            await fs.writeFile(this.filePath, storedLog, {
                flag: "w",
            });
        } catch (error) {
            console.log("Failed to log: ", error);
        }
    }
}
