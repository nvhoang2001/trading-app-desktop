import { Helmet } from 'react-helmet';
import { Snackbar, Alert } from '@mui/material';

import useLoginController from './useLoginController';

import AuthenticationPicture from '@/components/views/LoginPage/AuthLogo';
import LoginForm from '@/components/views/LoginPage/LoginForm';
import SignUpForm from '@/components/views/LoginPage/SignUpForm';
import classNames from 'classnames';
import ConfirmImportAccountDialog from '@/components/views/LoginPage/ImportAccount/ConfirmImportAccountDialog';
import ImportNewAccountDialog from '@/components/views/LoginPage/ImportAccount/ImportNewAccountDialog';

export default function LoginPage() {
    const {
        notification,
        activeTab,
        isShowConfirmImportAccountDialog,
        isShowImportAccountDialog,
        loginHandler,
        signUpHandler,
        closeNotificationHandler,
        tryCreateNewAccountHandler,
        tryImportAccountHandler,
        tryLogInAccountHandler,
        cancelImportAccount,
        closeImportAccountDialog,
        confirmImportAccount,
        importAccountHanler,
        openBackupFileSelectDialogHandler,
    } = useLoginController();

    return (
        <div>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div className="w-[960px] bg-white rounded-xl overflow-hidden flex flex-wrap justify-between p-[177px_130px_33px_95px]">
                {activeTab === 'SignUp' && (
                    <SignUpForm
                        className={classNames('overflow-hidden delay-75 transition-all duration-300')}
                        onSignInAccount={tryLogInAccountHandler}
                        onSubmit={signUpHandler}
                    />
                )}
                <AuthenticationPicture />
                {activeTab === 'SignIn' && (
                    <LoginForm
                        className={classNames('overflow-hidden delay-75 transition-all duration-300')}
                        onSubmit={loginHandler}
                        onCreateAccount={tryCreateNewAccountHandler}
                        onImportAccount={tryImportAccountHandler}
                    />
                )}
            </div>
            <Snackbar
                open={!!notification}
                onClose={closeNotificationHandler}
                autoHideDuration={5000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert severity={notification?.type || 'success'} variant="filled">
                    {notification?.message}
                </Alert>
            </Snackbar>
            <ConfirmImportAccountDialog
                isOpen={isShowConfirmImportAccountDialog}
                onCancel={cancelImportAccount}
                onOk={confirmImportAccount}
            />
            <ImportNewAccountDialog
                isOpen={isShowImportAccountDialog}
                onOk={importAccountHanler}
                onCancel={closeImportAccountDialog}
                onOpenFile={openBackupFileSelectDialogHandler}
            />
        </div>
    );
}
