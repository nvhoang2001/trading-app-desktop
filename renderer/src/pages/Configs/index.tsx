import { Helmet } from 'react-helmet';

import useConfigViewController from './useConfigViewController';

import BotConfigForm from '@/components/views/ConfigPage/BotConfig';

const ConfigPage: React.FC = () => {
    const { updateSystemConfigHandler } = useConfigViewController();

    return (
        <div>
            <Helmet>
                <title>System Config</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-semibold">System Settings</h1>
                <BotConfigForm onSubmit={updateSystemConfigHandler} />
            </div>
        </div>
    );
};

export default ConfigPage;
