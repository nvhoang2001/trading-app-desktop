import { useEffect } from 'react';
import { ISystemConfigForm } from '@/@types/configs';
import { useAppSelector } from '@/hooks/store';
import { useForm, Resolver } from 'react-hook-form';
import * as yup from 'yup';

const yupValidation = yup.object<ISystemConfigForm>().shape({
    alertAmount: yup
        .number()
        .required('This field is required')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    tradeTradeAmount: yup
        .number()
        .required('This field is require')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    tradeMinProfitAmount: yup
        .number()
        .required('This field is require')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    tradeActiveAmount: yup
        .number()
        .required('This field is required')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    crossMinProfitAmount: yup
        .number()
        .required('This field is require')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    crossTradeAmount: yup
        .number()
        .required('This field is require')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    crossActiveAmount: yup
        .number()
        .required('This field is required')
        .min(0, 'Please enter a valid amount')
        .typeError('Please enter a valid amount'),
    theme: yup.string().required('This field is required'),
});

const defaultForm: ISystemConfigForm = {
    alertAmount: 0,
    crossActiveAmount: 0,
    crossMinProfitAmount: 0,
    crossTradeAmount: 0,
    theme: 'light',
    tradeActiveAmount: 0,
    tradeMinProfitAmount: 0,
    tradeTradeAmount: 0,
};

const resolver: Resolver<ISystemConfigForm> = async (data) => {
    try {
        const values = await yupValidation.validate(data, {
            abortEarly: false,
        });

        return {
            values,
            errors: {},
        };
    } catch (errors) {
        return {
            values: {},
            errors: (errors as yup.ValidationError).inner.reduce(
                (allErrors, currentError) => ({
                    ...allErrors,
                    [currentError.path as string]: {
                        type: currentError.type ?? 'validation',
                        message: currentError.message,
                    },
                }),
                {}
            ),
        };
    }
};

export default function useBotConfigViewController(submit: (form: ISystemConfigForm) => void) {
    const configData = useAppSelector((state) => state.config.config);

    const formControl = useForm<ISystemConfigForm>({ resolver, defaultValues: defaultForm });
    const activeTheme = formControl.watch('theme');

    const alertAmountFieldControl = formControl.register('alertAmount');

    const tradeTradeAmountFieldControl = formControl.register('tradeTradeAmount');

    const tradeMinProfitAmountFieldControl = formControl.register('tradeMinProfitAmount');

    const tradeActiveAmountFieldControl = formControl.register('tradeActiveAmount');

    const crossTradeAmountFieldControl = formControl.register('crossTradeAmount');

    const crossMinProfitAmountFieldControl = formControl.register('crossMinProfitAmount');

    const crossActiveAmountFieldControl = formControl.register('crossActiveAmount');

    const themeFieldControl = formControl.register('theme', {
        onChange() {
            formControl.setValue('theme', activeTheme === 'dark' ? 'light' : 'dark');
        },
    });

    const restoreDefaultConfig = () => {
        formControl.reset({ ...defaultForm });
    };

    const formSubmitHandler = formControl.handleSubmit((form) => {
        submit(form);
    });

    useEffect(() => {
        formControl.reset({ ...configData });
    }, [configData, formControl]);

    return {
        errors: formControl.formState.errors,
        defaultForm: formControl.formState.defaultValues,
        alertAmountFieldControl,
        tradeTradeAmountFieldControl,
        tradeMinProfitAmountFieldControl,
        tradeActiveAmountFieldControl,
        crossActiveAmountFieldControl,
        crossTradeAmountFieldControl,
        crossMinProfitAmountFieldControl,
        themeFieldControl,
        isDarkMode: activeTheme === 'dark',
        submit: formSubmitHandler,
        restoreDefaultConfig,
    };
}
