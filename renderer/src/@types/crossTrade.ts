export type TTab = 'BTC' | 'ETH' | 'BNB';

export interface ICrossTradeActionState {
    isSyncInput: boolean;
    isSyncActions: boolean;
    isInvertAction: boolean;
    isActivateBot: boolean;
}

type TSyncInputAction = {
    type: 'SYNC_INPUT';
    data: boolean;
};

type TSyncActionsAction = {
    type: 'SYNC_ACTIONS';
    data: boolean;
};

type TInvertAction = {
    type: 'INVERT_ACTION';
    data: boolean;
};

type TActiveBot = {
    type: 'ACTIVE_BOT';
    data: boolean;
};

export type TActionDispatchType = TSyncInputAction | TSyncActionsAction | TInvertAction | TActiveBot;
