import { useAppSelector } from '@/hooks/store';
import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const Auth: React.FC<{ element: ReactElement }> = ({ element }) => {
    const loggedIn = useAppSelector((state) => state.user.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/dang-nhap" />;
    }

    return element;
};

export default Auth;
