import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';

import { ILoginForm } from '@/@types/auth';
import { useAppSelector } from '@/hooks/store';

const resolver: Resolver<ILoginForm> = async (values) => {
    return {
        values: values.password ? values : {},
        errors: !values.password
            ? {
                  password: {
                      type: 'required',
                      message: 'Please enter password to sign in',
                  },
              }
            : {},
    };
};

const defaultForm: ILoginForm = {
    password: '',
};

export default function useLoginFormController(submit: (form: ILoginForm) => void) {
    const formControl = useForm<ILoginForm>({ resolver, defaultValues: defaultForm });
    const username = useAppSelector((state) => state.user.username);
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
        username,
        isShowPassword,
        formProps: formControl.register,
        submit: submitFormHandler,
        toggleInputVisibility,
    };
}
