import { ESystemConfig, ISystemConfigForm } from "@/@types/systemConfig";
import { ipcRenderer } from "electron";

const systemConfigInvokes = {
    update: (form: ISystemConfigForm) => {
        return ipcRenderer.invoke(ESystemConfig.CONFIG_UPDATE_CONFIG, form);
    },
    getConfig: () => {
        return ipcRenderer.invoke(ESystemConfig.CONFIG_GET_CONFIG);
    },
};

export default systemConfigInvokes;
