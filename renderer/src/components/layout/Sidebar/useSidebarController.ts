import { useAppDispatch } from '@/hooks/store';
import { userActions } from '@/store/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useSidebarController() {
    const route = useLocation();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();

    const logoutUser = () => {
        dispatch(userActions.logout());
    };

    const navigateToPage = (item: { key: string }) => {
        navigator(item.key);
    };

    return {
        activeRoute: route.pathname,
        logoutUser,
        navigateToPage,
    };
}
