import { ISystemConfigForm } from '@/@types/configs';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { configAsyncActions } from '@/store/configSlice';
import { useEffect } from 'react';

export default function useConfigViewController() {
    const dispatch = useAppDispatch();

    const updateSystemConfigHandler = async (form: ISystemConfigForm) => {
        try {
            const results = await dispatch(configAsyncActions.updateSystemConfig(form)).unwrap();
            console.log('Res', results);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        dispatch(configAsyncActions.getSystemConfig());
    }, [dispatch]);

    return { updateSystemConfigHandler };
}
