import { TextField, InputAdornment, Button } from '@mui/material';
import useLoginFormController from './useLoginViewController';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { ILoginForm } from '@/@types/auth';

interface IComponentProps {
    onSubmit: (form: ILoginForm) => void;
    onImportAccount: () => void;
    onCreateAccount: () => void;
    className?: string;
}

const LoginForm: React.FC<IComponentProps> = ({ className, onSubmit, onCreateAccount, onImportAccount }) => {
    const { formProps, submit, formErrors, defaultForm, username, isShowPassword, toggleInputVisibility } =
        useLoginFormController(onSubmit);

    const passwordInpProps = formProps('password');

    return (
        <section className={className}>
            <h2 className="text-2xl text-gray-900 text-center pb-14 font-bold uppercase">
                Welcome back, <br /> <span>{username}</span>
            </h2>
            <form className="flex flex-col w-[290px]" onSubmit={submit}>
                <TextField
                    ref={passwordInpProps.ref}
                    label="Password"
                    variant="standard"
                    helperText={formErrors.password?.message}
                    defaultValue={defaultForm!.password}
                    error={!!formErrors.password?.message}
                    name={passwordInpProps.name}
                    InputProps={{
                        type: isShowPassword ? 'text' : 'password',

                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleInputVisibility}>
                                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    className="[&_input:focus]:shadow-[none]"
                    sx={{
                        '& input:focus': {
                            boxShadow: 'none',
                        },
                        mb: '.75rem',
                    }}
                    onChange={passwordInpProps.onChange}
                    onBlur={passwordInpProps.onBlur}
                />

                <div className="pt-5">
                    <Button type="submit" variant="outlined" sx={{ width: '100%', fontWeight: 600 }}>
                        Sign In
                    </Button>
                    <p className="text-gray-400 text-center pt-3 text-sm">
                        Import{' '}
                        <button
                            className="text-gray-800 hover:text-blue-700 transition-colors"
                            type="button"
                            onClick={onImportAccount}
                        >
                            account?
                        </button>
                    </p>
                </div>
            </form>

            <p className="pt-[136px] text-center">
                Don't have an account?{' '}
                <Button sx={{ textTransform: 'capitalize' }} onClick={onCreateAccount}>
                    Create new
                </Button>
            </p>
        </section>
    );
};

export default LoginForm;
