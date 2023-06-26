import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import type { TTab } from '@/@types/crossTrade';

interface IComponentProps {
    activeTab: TTab;
    onTabSwitch: (tab: TTab) => void;
}

const CoinTabs: React.FC<IComponentProps> = ({ activeTab, onTabSwitch }) => {
    function swithTabHandler(event: React.SyntheticEvent, tab: TTab) {
        onTabSwitch(tab);
    }

    return (
        <Box>
            <Tabs value={activeTab} className="mt-5" onChange={swithTabHandler}>
                <Tab label="BTC/USDT" value="BTC" />
                <Tab label="ETH/USDT" value="ETH" />
                <Tab label="BNB/USDT" value="BNB" />
            </Tabs>
        </Box>
    );
};

export default CoinTabs;
