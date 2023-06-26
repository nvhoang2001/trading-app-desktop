import { TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ISignUpForm } from '@/@types/auth';
import userSignUpController from './useSignUpController';

interface IComponentProps {
    onSubmit: (form: ISignUpForm) => void;
    onSignInAccount: () => void;
    className?: string;
}

const SignUpForm: React.FC<IComponentProps> = ({ onSubmit, onSignInAccount, className }) => {
    const { defaultForm, formErrors, registerField, submit, isShowPassword, toggleInputVisibility } =
        userSignUpController(onSubmit);

    const usernameInputProps = registerField('username');
    const avatarInputProps = registerField('avatar');
    const passwordInputProps = registerField('password');

    return (
        <section className={className}>
            <h2 className="text-2xl text-gray-900 text-center pb-14 font-bold uppercase">Create User Account</h2>
            <form className="flex flex-col w-[290px]" onSubmit={submit}>
                <TextField
                    ref={usernameInputProps.ref}
                    label="Username"
                    variant="standard"
                    helperText={formErrors.username?.message}
                    defaultValue={defaultForm!.username}
                    error={!!formErrors.username?.message}
                    name={usernameInputProps.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
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
                    onChange={usernameInputProps.onChange}
                    onBlur={usernameInputProps.onBlur}
                />
                {/* <TextField
                    ref={usernameInputProps.ref}
                    label="Username"
                    variant="standard"
                    helperText={formErrors.username?.message}
                    defaultValue={defaultForm!.username}
                    error={!!formErrors.username?.message}
                    name={usernameInputProps.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
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
                    onChange={usernameInputProps.onChange}
                    onBlur={usernameInputProps.onBlur}
                /> */}
                <TextField
                    ref={passwordInputProps.ref}
                    label="Password"
                    variant="standard"
                    helperText={formErrors.password?.message}
                    defaultValue={defaultForm!.password}
                    error={!!formErrors.password?.message}
                    name={passwordInputProps.name}
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
                    onChange={passwordInputProps.onChange}
                    onBlur={passwordInputProps.onBlur}
                />

                <div className="pt-5">
                    <Button type="submit" variant="outlined" sx={{ width: '100%', fontWeight: 600 }}>
                        Sign Up
                    </Button>
                </div>
            </form>

            <p className="pt-[136px] text-center">
                Already have an account?{' '}
                <Button sx={{ textTransform: 'capitalize' }} onClick={onSignInAccount}>
                    Sign In
                </Button>
            </p>
        </section>
    );
};

export default SignUpForm;
