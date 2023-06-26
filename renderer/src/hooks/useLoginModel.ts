import { ILoginForm, ISignUpForm, TLoginResult, TSignUpSuccess } from '@/@types/auth';
import { useAppDispatch, useAppSelector } from './store';
import { userAsyncActions } from '@/store/userSlice';
import { authAPI } from '@/request';
import { useCallback } from 'react';

export function useLoginModel() {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.user.username);

    const dispatchLogin = useCallback(
        async (form: ILoginForm) => {
            const response = await dispatch(userAsyncActions.userSignInHandler(form)).unwrap();

            return response as [TLoginResult | undefined];
        },
        [dispatch]
    );

    const dispatchSignUp = useCallback(
        async (form: ISignUpForm) => {
            const response = await dispatch(userAsyncActions.userSignUpHandler(form)).unwrap();
            return response as [TSignUpSuccess | undefined];
        },
        [dispatch]
    );

    const dispatchImportUser = useCallback(
        async (filePath: string) => {
            const response = await dispatch(userAsyncActions.importUserFromBackupFileHandler(filePath)).unwrap();
            return response as [TLoginResult | undefined];
        },
        [dispatch]
    );

    const dispatchOpenFileDialog = useCallback(async () => {
        const filePath = await authAPI.selectBackupFile();
        return filePath;
    }, []);

    return {
        isSafeImport: !username,
        username,
        dispatchOpenFileDialog,
        dispatchLogin,
        dispatchSignUp,
        dispatchImportUser,
    };
}
