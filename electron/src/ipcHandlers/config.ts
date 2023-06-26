import { ESystemConfig, ISystemConfigForm } from "@/@types/systemConfig";
import { IpcMainInvokeEvent, ipcMain } from "electron";
import { dbConnection } from "@/store/database";
import { Config } from "@/store/schema/Config";
import { User } from "@/store/schema/User";
import {
    systemConfigErrorFactory,
    systemConfigSuccessResultFactory,
} from "@/classes/SystemConfig";

export async function updateSystemConfigHanler(
    event: IpcMainInvokeEvent,
    form: ISystemConfigForm
) {
    try {
        const sysConfig = dbConnection.getRepository(Config);
        const [user] = await dbConnection.getRepository(User).find();

        let config = await sysConfig.findOne({
            where: {
                user,
            },
        });

        if (!config) {
            config = new Config();

            config.user = user;
        }

        Object.assign(config, form);

        await sysConfig.save(config);

        delete config.user;

        return systemConfigSuccessResultFactory.generateResponse(config);
    } catch (error) {
        console.log("System config update error: ", error);
        return systemConfigErrorFactory.unknowReason();
    }
}

export async function getSystemConfigHandler(event: IpcMainInvokeEvent) {
    try {
        const sysConfig = dbConnection.getRepository(Config);

        const [user] = await dbConnection.getRepository(User).find();
        const config = await sysConfig.findOne({
            where: {
                user,
            },
        });

        return systemConfigSuccessResultFactory.generateResponse(config);
    } catch (error) {
        console.log("System config get error: ", error);
        return systemConfigErrorFactory.unknowReason();
    }
}

function initHandlers() {
    ipcMain.handle(
        ESystemConfig.CONFIG_UPDATE_CONFIG,
        updateSystemConfigHanler
    );

    ipcMain.handle(ESystemConfig.CONFIG_GET_CONFIG, getSystemConfigHandler);
}

export default initHandlers;
