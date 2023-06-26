import { ISignUpForm } from '@/@types/auth';
import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { object as yupObject, string as yupString, ValidationError } from 'yup';

const yupValidation = yupObject<ISignUpForm>().shape({
    username: yupString().required('Please enter username'),
    avatar: yupString(),
    password: yupString().required('Please enter your account password'),
});

const resolver: Resolver<ISignUpForm> = async (data) => {
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
            errors: (errors as ValidationError).inner.reduce(
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

const defaultForm: ISignUpForm = {
    password: '',
    avatar: '',
    username: '',
};

export default function useSignUpController(submit: (form: ISignUpForm) => void) {
    const formControl = useForm<ISignUpForm>({ resolver, defaultValues: defaultForm });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const submitFormHandler = formControl.handleSubmit((form) => {
        submit(form);
    });
    const toggleInputVisibility = () => {
        setIsShowPassword((isShow) => !isShow);
    };

    return {
        formErrors: formControl.formState.errors,
        defaultForm: formControl.formState.defaultValues,
        isShowPassword,
        registerField: formControl.register,
        submit: submitFormHandler,
        toggleInputVisibility,
    };
}
