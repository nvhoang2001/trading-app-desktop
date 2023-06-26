import CoinTabs from '@/components/views/CrossTradePage/CoinTabs';
import { Helmet } from 'react-helmet';
import { useCrossTradeViewController } from './useCrossTradeViewController';
import ActionManagement from '@/components/views/CrossTradePage/ActionManagement';

const CrossTradePage: React.FC = () => {
    const { activeTab, actionStates, updateActiveState, updateTabHandler } = useCrossTradeViewController();

    return (
        <div>
            <Helmet>
                <title>Cross Trade</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-semibold">Cross-platform Trade</h1>
                <CoinTabs activeTab={activeTab} onTabSwitch={updateTabHandler} />
                <ActionManagement actionsState={actionStates} updateState={updateActiveState} />
            </div>
        </div>
    );
};

export default CrossTradePage;
