import { ICrossTradeActionState, TActionDispatchType, TTab } from '@/@types/crossTrade';
import { useReducer, useState } from 'react';

const initialActionState: ICrossTradeActionState = {
    isSyncInput: false,
    isSyncActions: false,
    isInvertAction: false,
    isActivateBot: false,
};

function actionReducer(state: ICrossTradeActionState, action: TActionDispatchType) {
    const updatedState = { ...state };
    switch (action.type) {
        case 'SYNC_INPUT': {
            updatedState.isSyncInput = action.data;

            return updatedState;
        }
        case 'SYNC_ACTIONS': {
            updatedState.isSyncActions = action.data;

            if (action.data) {
                updatedState.isInvertAction = false;
            }

            return updatedState;
        }
        case 'INVERT_ACTION': {
            updatedState.isInvertAction = action.data;

            if (action.data) {
                updatedState.isSyncActions = false;
            }

            return updatedState;
        }
        case 'ACTIVE_BOT': {
            updatedState.isActivateBot = action.data;

            if (action.data) {
                updatedState.isSyncInput = false;
                updatedState.isInvertAction = false;
                updatedState.isSyncActions = false;
            }

            return updatedState;
        }
        default:
            break;
    }

    return state;
}

export function useCrossTradeViewController() {
    const [activeTab, setActiveTab] = useState<TTab>('BTC');
    const [actionStates, actionDispatcher] = useReducer(actionReducer, initialActionState);

    function updateTabHandler(tab: TTab) {
        setActiveTab(tab);
    }

    function updateActiveState(action: TActionDispatchType) {
        actionDispatcher(action);
    }

    return {
        activeTab,
        actionStates,
        updateActiveState,
        updateTabHandler,
    };
}
