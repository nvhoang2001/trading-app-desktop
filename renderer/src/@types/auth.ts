export interface ILoginForm {
    password: string;
}

export interface ISignUpForm {
    username: string;
    avatar: string;
    password: string;
}

export type TUserNotFoundError = { status: 'failed'; reason: 'NOT_EXIST_USER_INFO' };

export type TUnknownError = { status: 'failed'; reason: 'UNKNOWN' };

export type TWrongSignInPasswordError = { status: 'failed'; reason: 'WRONG_PASSWORD' };

export type TInvalidBackupFileError = { status: 'failed'; reason: 'INVALID_BACKUP_FILE' };

export type TLoginError = TUserNotFoundError | TUnknownError | TWrongSignInPasswordError | TInvalidBackupFileError;

export type TLogInSuccess = { status: 'success' };
export type TSignUpSuccess = TLogInSuccess & { user: Omit<ISignUpForm, 'password'> };
export type TLoginResult = TLogInSuccess | TLoginError;
export type TSignUpResult = TSignUpSuccess | TLoginError;
