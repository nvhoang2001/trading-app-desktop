export enum ESystemConfig {
    CONFIG_UPDATE_CONFIG = "CONFIG_UPDATE_CONFIG",
    CONFIG_GET_CONFIG = "CONFIG_GET_CONFIG",
}

export interface ISystemConfigForm {
    alertAmount: number;
    tradeTradeAmount: number;
    tradeMinProfitAmount: number;
    tradeActiveAmount: number;
    crossMinProfitAmount: number;
    crossTradeAmount: number;
    crossActiveAmount: number;
    theme: "dark" | "light";
}
