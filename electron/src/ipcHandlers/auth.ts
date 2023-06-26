import {
    ipcMain,
    type IpcMainInvokeEvent,
    type WebContents,
    dialog,
    BrowserWindow,
} from "electron";
import fs from "fs/promises";
import {
    EAuthenticationChannels,
    ILoginForm,
    ISignUpForm,
} from "@/@types/authentication";
import { authenticationErrorFactory } from "@/classes/Authentication";
import { encodeData, get256HashString } from "@/utils/crypto";
import { decodeFileData } from "@/utils/fileEncryption";
import { dbConnection } from "@/store/database";
import { User } from "@/store/schema/User";

function encryptPassword(password: string) {
    const iv = "b0b788dfbb144d9022c75374e6d9a92a";
    const encryptText = "bncaskdbvasbvlaslslasfhj";
    const keyLength = 32;
    const hashedPassword = get256HashString(password);

    const encryptedPassword = encodeData(
        encryptText,
        hashedPassword.slice(-keyLength),
        iv
    );

    return encryptedPassword;
}

export async function userLoginHandler(
    event: IpcMainInvokeEvent,
    form: ILoginForm
) {
    try {
        const userRepo = dbConnection.getRepository(User);
        const [userData] = await userRepo.find();

        if (!userData) {
            return authenticationErrorFactory.userInfoNotExist();
        }

        const encryptedPassword = encryptPassword(form.password);

        if (userData.password !== encryptedPassword) {
            return authenticationErrorFactory.wrongPassword();
        }

        return { status: "success" };
    } catch (error) {
        console.log("Error: ", error);

        return authenticationErrorFactory.unknowReason();
    }
}

export async function userSignUpHandler(
    event: IpcMainInvokeEvent,
    form: ISignUpForm
) {
    try {
        const user = new User();
        user.username = form.username;
        user.password = encryptPassword(form.password);
        user.avatar = form.avatar;

        const userRepo = dbConnection.getRepository(User);
        await userRepo.save(user);

        return {
            status: "success",
            user: {
                username: form.username,
                avatar: form.avatar,
            },
        };
    } catch (error) {
        console.log("Error: ", error);

        return authenticationErrorFactory.unknowReason();
    }
}

async function getUserInfo() {
    try {
        const userRepo = dbConnection.getRepository(User);
        const [userData] = await userRepo.find();

        if (userData) {
            return JSON.stringify(userData);
        } else {
            throw new Error("");
        }
    } catch (error) {
        return;
    }
}

export async function checkUserInfo(webContents: WebContents) {
    const userInfo = await getUserInfo();

    if (userInfo) {
        const info = JSON.parse(userInfo);
        webContents.send(EAuthenticationChannels.AUTH_INIT_USER, info);
    }
}

export async function importUserFromFileHandler(
    event: IpcMainInvokeEvent,
    filePath: string
) {
    try {
        console.log("File: ", filePath);

        const file = await fs.readFile(filePath);
        const fileContent = file.toString();
        const decryptedContent = decodeFileData(fileContent);
        try {
            const userInfo: ISignUpForm = JSON.parse(decryptedContent);
            return { status: "success", userInfo };
        } catch (error) {
            return authenticationErrorFactory.invalidBackupFile();
        }
    } catch (error) {
        console.log("Error: ", error);
        // @ts-ignore
        if (error.code === "ENOENT") {
            return authenticationErrorFactory.invalidBackupFile();
        }

        return authenticationErrorFactory.unknowReason();
    }
}

export async function openBackupFileDialog(event: IpcMainInvokeEvent) {
    const { canceled, filePaths } = await dialog.showOpenDialog(
        (BrowserWindow.fromWebContents(event.sender) as BrowserWindow) ||
            undefined,
        {
            title: "Select backup file",
            properties: ["openFile", "showHiddenFiles"],
            filters: [
                {
                    name: "Backup Files",
                    extensions: [".bkt.txt"],
                },
                {
                    name: "All Files",
                    extensions: ["*"],
                },
            ],
        }
    );

    if (canceled) {
        return undefined;
    } else return filePaths[0];
}

function initHandlers() {
    ipcMain.handle(EAuthenticationChannels.AUTH_SIGN_IN, userLoginHandler);
    ipcMain.handle(EAuthenticationChannels.AUTH_SIGN_UP, userSignUpHandler);
    ipcMain.handle(
        EAuthenticationChannels.AUTH_IMPORT_USER,
        importUserFromFileHandler
    );
    ipcMain.handle(
        EAuthenticationChannels.AUTH_OPEN_FILE_DIALOG,
        openBackupFileDialog
    );
}

export default initHandlers;
