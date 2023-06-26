import path from "path";

import { app } from "electron";
import { DataSource } from "typeorm";
import { User } from "./schema/User";
import { Balance } from "./schema/Balance";
import { Coin } from "./schema/Coin";
import { Config } from "./schema/Config";
import { Key } from "./schema/Key";
import { Transaction } from "./schema/Transaction";

const dbPath = path.resolve(app.getPath("appData"), "store", "db.sqlite");
console.log("Path: ", dbPath);

export const dbConnection = new DataSource({
    type: "sqlite",
    database: dbPath,
    entities: [User, Balance, Coin, Config, Key, Transaction],
});
