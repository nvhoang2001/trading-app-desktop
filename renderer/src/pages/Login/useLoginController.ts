import type { ILoginForm, ISignUpForm, TLoginResult } from '@/@types/auth';
import { useState, useCallback, useMemo } from 'react';
import type { AlertColor } from '@mui/material';
import { useLoginModel } from '@/hooks/useLoginModel';
import { useNavigate } from 'react-router-dom';

export default function useLoginController() {
    const { dispatchLogin, dispatchSignUp, username, dispatchImportUser, dispatchOpenFileDialog } = useLoginModel();
    const [activeTab, setActiveTab] = useState<'SignIn' | 'SignUp'>(username ? 'SignIn' : 'SignUp');
    const [notification, setNotification] = useState<{
        type: AlertColor;
        message: string;
    } | null>(null);
    const [isShowConfirmImportAccountDialog, setIsShowConfirmImportAccountDialog] = useState(false);
    const [isShowImportAccountDialog, setIsShowImportAccountDialog] = useState(false);
    const navigator = useNavigate();

    const showToastMessage = (info: TLoginResult) => {
        const notification: {
            type: AlertColor;
            message: string;
        } = {
            type: 'error',
            message: 'System error, please try again',
        };
        if (info.status === 'failed') {
            switch (info.reason) {
                case 'NOT_EXIST_USER_INFO':
                    notification.message = 'Not found user info, maybe another program has deleted your account';
                    break;

                case 'WRONG_PASSWORD':
                    notification.message = 'Wrong password, please try again';
                    break;
                case 'INVALID_BACKUP_FILE':
                    notification.message = 'Invalid backup file';
                    break;
                default:
                    break;
            }

            setNotification(notification);
            return;
        }

        notification.type = 'success';
        notification.message = 'Login success';

        setNotification(notification);
    };

    const authenticateUser = useCallback(
        (dispatcher: typeof dispatchLogin | typeof dispatchSignUp) => {
            return async (form: any) => {
                const [response] = await dispatcher(form);

                if (!response) {
                    return;
                }

                showToastMessage(response);

                if (response.status === 'success') {
                    navigator('/');
                }
            };
        },
        [navigator]
    );

    const loginHandler = useMemo<(form: ILoginForm) => Promise<void>>(
        () => authenticateUser(dispatchLogin),
        [authenticateUser, dispatchLogin]
    );

    const signUpHandler = useMemo<(form: ISignUpForm) => Promise<void>>(
        () => authenticateUser(dispatchSignUp),
        [authenticateUser, dispatchSignUp]
    );

    const tryImportAccountHandler = () => {
        if (!username) {
            setIsShowConfirmImportAccountDialog(true);
        } else {
            setIsShowImportAccountDialog(true);
        }
    };

    const confirmImportAccount = () => {
        setIsShowConfirmImportAccountDialog(false);
        setIsShowImportAccountDialog(true);
    };

    const cancelImportAccount = () => {
        setIsShowConfirmImportAccountDialog(false);
    };

    const importAccountHanler = useCallback(
        async (filePath: string) => {
            const [response] = await dispatchImportUser(filePath);

            if (!response) {
                return;
            }

            showToastMessage(response);
        },
        [dispatchImportUser]
    );

    const openBackupFileSelectDialogHandler = useCallback(async () => {
        const filePath = await dispatchOpenFileDialog();
        if (filePath) {
            importAccountHanler(filePath);
        }
    }, [dispatchOpenFileDialog, importAccountHanler]);

    const closeImportAccountDialog = () => {
        setIsShowImportAccountDialog(false);
    };

    const tryCreateNewAccountHandler = () => {
        setActiveTab('SignUp');
    };

    const tryLogInAccountHandler = () => {
        setActiveTab('SignIn');
    };

    const closeNotificationHandler = () => {
        setNotification(null);
    };

    return {
        notification,
        activeTab,
        isShowConfirmImportAccountDialog,
        isShowImportAccountDialog,
        closeNotificationHandler,
        loginHandler,
        signUpHandler,
        tryCreateNewAccountHandler,
        tryLogInAccountHandler,
        tryImportAccountHandler,
        confirmImportAccount,
        cancelImportAccount,
        importAccountHanler,
        closeImportAccountDialog,
        openBackupFileSelectDialogHandler,
    };
}
