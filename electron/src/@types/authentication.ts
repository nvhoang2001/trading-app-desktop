export enum EAuthenticationChannels {
    AUTH_SIGN_IN = "AUTH_SIGN_IN",
    AUTH_SIGN_UP = "AUTH_SIGN_UP",
    AUTH_INIT_USER = "AUTH_INIT_USER",
    AUTH_IMPORT_USER = "AUTH_IMPORT_USER",
    AUTH_OPEN_FILE_DIALOG = "AUTH_OPEN_FILE_DIALOG",
}

export interface ILoginForm {
    password: string;
}

export interface ISignUpForm {
    username: string;
    avatar: string;
    password: string;
}
