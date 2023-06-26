import { MenuItem, MenuList, Button } from '@mui/material';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import useSidebarController from './useSidebarController';
import classNames from 'classnames';

interface IComponentProps {
    className?: string;
}

const menuList = [
    {
        key: '/',
        label: 'Dashboard',
        icon: <HomeOutlinedIcon />,
    },
    {
        key: '/analytics',
        label: 'Analytics',
        icon: <InsertChartOutlinedIcon />,
    },
    {
        key: '/trade-view',
        label: 'Trading View',
        icon: <CurrencyExchangeOutlinedIcon />,
    },
    {
        key: '/platform-diff',
        label: 'Cross-platform trade',
        icon: <SsidChartOutlinedIcon />,
    },
    {
        key: '/history',
        label: 'Trade history',
        icon: <HistoryOutlinedIcon />,
    },
    {
        key: '/config',
        label: 'System config',
        icon: <SettingsOutlinedIcon />,
    },
];

const Sidebar: React.FC<IComponentProps> = ({ className }) => {
    const { activeRoute, logoutUser, navigateToPage } = useSidebarController();
    return (
        <aside className={classNames('flex flex-col justify-between', className)}>
            <MenuList>
                {menuList.map((item) => (
                    <MenuItem
                        key={item.key}
                        selected={item.key === activeRoute}
                        sx={{
                            '&.Mui-selected': {
                                borderRight: '3px solid #fe8a7d',
                                color: '#fe8a7d',
                            },
                        }}
                        onClick={() => navigateToPage(item)}
                    >
                        <span className="mr-4">{item.icon}</span> {item.label}
                    </MenuItem>
                ))}
            </MenuList>

            <div className="text-center">
                <Button sx={{ width: '100%', color: '#0f0' }} onClick={logoutUser}>
                    Sign out
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
