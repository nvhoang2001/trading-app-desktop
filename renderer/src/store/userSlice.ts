import { ILoginForm, ISignUpForm, TLoginResult, TSignUpResult } from '@/@types/auth';
import { EConfigs } from '@/@types/configs';
import { authAPI } from '@/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUserState {
    username: string;
    avatar: string;
    status: 'init' | 'loading' | 'success' | 'error';
    loggedIn: boolean;
}

const initialState: IUserState = {
    avatar: '',
    username: localStorage.getItem(EConfigs.ACCOUNT_NAME) || '',
    loggedIn: false,
    status: 'init',
};

const userSignInHandler = createAsyncThunk('user/signIn', async (form: ILoginForm) => {
    try {
        const response = await authAPI.login(form);
        return [response, undefined];
    } catch (error) {
        return [undefined, error];
    }
});

const userSignUpHandler = createAsyncThunk('user/signUp', async (form: ISignUpForm) => {
    try {
        const response = await authAPI.signUp(form);
        return [response, undefined];
    } catch (error) {
        return [undefined, error];
    }
});

const importUserFromBackupFileHandler = createAsyncThunk('user/import', async (filePath: string) => {
    try {
        const response = await authAPI.importUser(filePath);
        return [response, undefined];
    } catch (error) {
        return [undefined, error];
    }
});

export const userSlice = createSlice({
    name: 'user',
    reducers: {
        logout(state) {
            state.loggedIn = false;
        },
    },
    initialState,
    extraReducers(builder) {
        builder.addCase(userSignInHandler.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(userSignInHandler.fulfilled, (state, actions) => {
            const [response, error] = actions.payload as [TLoginResult, Error];

            if (error || response.status === 'failed') {
                state.status = 'error';
            } else {
                state.loggedIn = true;
                state.status = 'success';
            }
        });

        builder.addCase(userSignUpHandler.fulfilled, (state, actions) => {
            const [response, error] = actions.payload as [TSignUpResult, Error];

            if (error || response.status === 'failed') {
                state.status = 'error';
            } else {
                state.loggedIn = true;
                state.status = 'success';
                state.username = response.user.username;
                state.avatar = response.user.avatar;
            }
        });
    },
});

export const userActions = userSlice.actions;
export const userAsyncActions = { userSignInHandler, userSignUpHandler, importUserFromBackupFileHandler };

export default userSlice.reducer;
