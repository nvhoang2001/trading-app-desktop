import { TUnknownError } from './auth';

export enum EConfigs {
    ACCOUNT_NAME = 'ACCOUNT_NAME',
}

export interface ISystemConfigForm {
    alertAmount: number;
    tradeTradeAmount: number;
    tradeMinProfitAmount: number;
    tradeActiveAmount: number;
    crossMinProfitAmount: number;
    crossTradeAmount: number;
    crossActiveAmount: number;
    theme: 'dark' | 'light';
}

export type TSuccessResult<T> = { status: 'success'; data: T };
export type TError = TUnknownError;
export type TConfigResult<S = any> = TSuccessResult<S> | TError;
