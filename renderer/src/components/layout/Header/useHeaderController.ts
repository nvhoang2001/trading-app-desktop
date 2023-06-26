import { useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { userActions } from '@/store/userSlice';

export default function useHeaderController() {
    const username = useAppSelector((state) => state.user.username);
    const avatar = useAppSelector((state) => state.user.avatar);
    const dispatch = useAppDispatch();

    const [isShowMenu, setIsShowMenu] = useState(false);

    const rfUserBtn = useRef<HTMLButtonElement>(null);

    const openMenu = () => {
        setIsShowMenu(true);
    };

    const closeMenu = () => {
        setIsShowMenu(false);
    };

    const logoutUser = () => {
        dispatch(userActions.logout());
    };

    const selectMenuOptionHandler = (option: 'setting' | 'profile' | 'logout') => {
        switch (option) {
            case 'setting':
                break;
            case 'profile':
                break;
            case 'logout':
                logoutUser();
                break;
            default:
                break;
        }

        closeMenu();
    };

    return { username, avatar, isShowMenu, openMenu, closeMenu, rfUserBtn, selectMenuOptionHandler };
}
