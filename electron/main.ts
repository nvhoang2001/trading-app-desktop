import { Worker } from "worker_threads";
import * as dotenv from "dotenv";

import {
    BrowserWindow,
    Menu,
    type MenuItem,
    type MenuItemConstructorOptions,
    app,
} from "electron";
import path from "path";

import initIPCHanlers from "@/ipcHandlers";
import { checkUserInfo } from "@/ipcHandlers/auth";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";
import { initDB } from "@/store/initDB";

const logo = require("@/assets/logo-mini.jpg");

dotenv.config();
initDB();

// function initWorkers() {
//     const marketWorker = new Worker(
//         path.resolve(__dirname, "workers", "marketWorker")
//     );
//     marketWorker.on("message", (ev) => {
//         console.log("Event: ", ev);
//     });
// }

function init(): void {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        icon: path.join(__dirname, logo),
    });

    const menuList: (MenuItemConstructorOptions | MenuItem)[] = [];
    const appMenu = Menu.buildFromTemplate(menuList);
    Menu.setApplicationMenu(appMenu);

    switch (process.env.NODE_ENV) {
        case "development":
            mainWindow.loadURL("http://localhost:5000");
            mainWindow.webContents.openDevTools();
            installExtension([REDUX_DEVTOOLS]);
            break;

        default:
            mainWindow.loadFile("../renderer/dist/index.html");
            break;
    }

    // initWorkers();

    mainWindow.webContents.on("did-finish-load", () => {
        checkUserInfo(mainWindow.webContents);
    });
}

app.whenReady().then(() => {
    initIPCHanlers();
    init();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            init();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
