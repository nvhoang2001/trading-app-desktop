import { ErrorFactory } from "./Base";

export class AuthenticationErrorFactory extends ErrorFactory {
    wrongPassword() {
        return {
            status: "failed",
            reason: "WRONG_PASSWORD",
        };
    }

    userInfoNotExist() {
        return {
            status: "failed",
            reason: "NOT_EXIST_USER_INFO",
        };
    }

    invalidBackupFile() {
        return {
            status: "failed",
            reason: "INVALID_BACKUP_FILE",
        };
    }
}

export const authenticationErrorFactory = new AuthenticationErrorFactory();
