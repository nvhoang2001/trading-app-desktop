import { EConfigs, ISystemConfigForm, TConfigResult } from '@/@types/configs';
import { configAPI } from '@/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IConfigState {
    status: 'init' | 'loading' | 'success' | 'error';
    config: ISystemConfigForm;
}

const initialState: IConfigState = {
    status: 'init',
    config: {
        alertAmount: 0,
        crossActiveAmount: 0,
        crossMinProfitAmount: 0,
        crossTradeAmount: 0,
        theme: 'light',
        tradeActiveAmount: 0,
        tradeMinProfitAmount: 0,
        tradeTradeAmount: 0,
    },
};

const getSystemConfig = createAsyncThunk('config/getConfig', async () => {
    try {
        const response = await configAPI.getConfig();
        console.log('Config: ', response);

        return [response, undefined];
    } catch (error) {
        return [undefined, error];
    }
});

const updateSystemConfig = createAsyncThunk('config/updateConfig', async (form: ISystemConfigForm) => {
    try {
        console.log('Form: ', form);

        const response = await configAPI.updateConfig(form);
        console.log('Config: ', response);

        return [response, undefined];
    } catch (error) {
        return [undefined, error];
    }
});

export const configSlice = createSlice({
    name: 'config',
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder.addCase(getSystemConfig.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(getSystemConfig.fulfilled, (state, actions) => {
            const [response, error] = actions.payload as [TConfigResult<ISystemConfigForm>, Error];

            if (error || response.status === 'failed') {
                state.status = 'error';
            } else {
                state.status = 'success';

                if (response.data) {
                    state.config = response.data;
                    console.log('Res config: ', state.config);
                }
            }
        });

        builder.addCase(updateSystemConfig.pending, (state) => {
            state.status = 'loading';
        });

        builder.addCase(updateSystemConfig.fulfilled, (state, actions) => {
            const [response, error] = actions.payload as [TConfigResult<ISystemConfigForm>, Error];

            if (error || response.status === 'failed') {
                state.status = 'error';
            } else {
                state.status = 'success';
                state.config = response.data;
            }
        });
    },
});

export const configActions = configSlice.actions;
export const configAsyncActions = { getSystemConfig, updateSystemConfig };

export default configSlice.reducer;
