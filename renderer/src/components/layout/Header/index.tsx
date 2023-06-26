import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import useHeaderController from './useHeaderController';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menuList = [
    {
        key: 'setting',
        label: 'Settings',
        icon: <SettingsOutlinedIcon />,
    },
    {
        key: 'profile',
        label: 'Profile',
        icon: <PersonOutlineOutlinedIcon />,
    },
    {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlinedIcon />,
    },
];

const Header: React.FC = () => {
    const { avatar, username, closeMenu, isShowMenu, openMenu, rfUserBtn, selectMenuOptionHandler } =
        useHeaderController();
    return (
        <header className="bg-white flex justify-between items-center pr-5">
            <Link to="/" className="flex items-center bg-[#404e67] w-[240px] px-4 py-2">
                <img src="/images/logo-mini.png" alt="" height={50} width={50} />
                <span className="border-l-4 border-solid border-orange-500 text-white pl-4">Trading App</span>
            </Link>
            <Button ref={rfUserBtn} disableElevation endIcon={<KeyboardArrowDownIcon />} onClick={openMenu}>
                {avatar ? (
                    <img src={avatar} alt="" width={30} height={30} className="mr-3 rounded" />
                ) : (
                    <AccountCircleIcon sx={{ fontSize: 30 }} className="mr-3 rounded" />
                )}

                {username}
            </Button>
            <Menu
                open={isShowMenu}
                onClose={closeMenu}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: 200,
                    },
                }}
                anchorEl={rfUserBtn.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {menuList.map((item) => (
                    <MenuItem
                        key={item.key}
                        disableRipple
                        onClick={() => selectMenuOptionHandler(item.key as 'setting' | 'profile' | 'logout')}
                    >
                        <span className="mr-4"> {item.icon} </span>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </header>
    );
};

export default Header;
