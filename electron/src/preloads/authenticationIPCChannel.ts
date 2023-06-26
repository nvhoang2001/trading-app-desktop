import { ipcRenderer } from "electron";
import {
    EAuthenticationChannels,
    ILoginForm,
    ISignUpForm,
} from "@/@types/authentication";
import { EConfigs } from "@/constants/configs";

ipcRenderer.once(
    EAuthenticationChannels.AUTH_INIT_USER,
    (event, form: ISignUpForm) => {
        const username = localStorage.getItem(EConfigs.ACCOUNT_NAME);

        localStorage.setItem(EConfigs.ACCOUNT_NAME, form.username);

        if (!username) {
            window.location.reload();
        }
    }
);

const authChannelInvokes = {
    signIn: (form: ILoginForm) => {
        return ipcRenderer.invoke(EAuthenticationChannels.AUTH_SIGN_IN, form);
    },
    signUp: (form: ISignUpForm) => {
        return ipcRenderer.invoke(EAuthenticationChannels.AUTH_SIGN_UP, form);
    },
    importUser: (filePath: string) => {
        return ipcRenderer.invoke(
            EAuthenticationChannels.AUTH_IMPORT_USER,
            filePath
        );
    },
    openDialog: () => {
        return ipcRenderer.invoke(
            EAuthenticationChannels.AUTH_OPEN_FILE_DIALOG
        );
    },
};

export default authChannelInvokes;
