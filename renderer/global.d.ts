import { ILoginForm, ISignUpForm, TLoginResult, TSignUpSuccess } from '@/@types/auth';
import { ISystemConfigForm, TConfigResult } from '@/@types/configs';

declare module '*.module.css';
declare module '*.module.scss';

declare global {
    interface Window {
        electronApi: {
            authChannels: {
                signIn: (form: ILoginForm) => Promise<TLoginResult>;
                signUp: (form: ISignUpForm) => Promise<TSignUpSuccess>;
                importUser: (filePath: string) => Promise<TLoginResult>;
                openDialog: () => Promise<string | undefined>;
            };
            configChannels: {
                update: (form: ISystemConfigForm) => Promise<TConfigResult<ISystemConfigForm>>;
                getConfig: () => Promise<TConfigResult<ISystemConfigForm>>;
            };
        };
    }

    interface File {
        path: string;
    }
}
