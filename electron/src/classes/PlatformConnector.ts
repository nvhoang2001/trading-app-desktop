import ccxt from "ccxt";
import type { Exchange } from "ccxt";

import { EventEmitter } from "events";

import { TSupportTokens } from "@/@types/token";
import { FileLogger } from "./Logger";

export abstract class PlatformConnector {
    connector: Exchange;
    // rateLimit: number = 50;
    logger: FileLogger;
    socketEvent: EventEmitter;

    constructor(
        options?: { apiKey?: string; secret?: string },
        isTestnet = true
    ) {
        this.connector = this.initializeConnector(options);
        this.socketEvent = new EventEmitter();

        if (isTestnet) {
            this.connector.setSandboxMode(true);
        }
    }

    handleSocketPushData(data: object) {
        this.socketEvent.emit("price-change", data);
    }

    abstract initializeConnector(options?: {
        apiKey?: string;
        secret?: string;
    }): Exchange;

    abstract initPriceListenerSocket(): void;

    getUserBalance() {
        return this.connector.fetchBalance();
    }

    loadMarket(reload?: boolean, params?: object) {
        return this.connector.loadMarkets(reload, params);
    }

    async getTokenMarket(symbol: TSupportTokens) {
        await this.loadMarket();

        return this.connector.market(`${symbol}/USD`);
    }

    getTokenOHLCV(
        symbol: TSupportTokens,
        timeframe?: string,
        since?: number,
        limit?: number,
        params?: object
    ) {
        return this.connector.fetchOHLCV(
            `${symbol}/USDT`,
            timeframe,
            since,
            limit,
            params
        );
    }

    buyToken(symbol: TSupportTokens, amount: number, params?: object) {
        return this.connector.createMarketBuyOrder(symbol, amount, params);
    }

    sellToken(symbol: TSupportTokens, amount: number, params?: object) {
        return this.connector.createMarketSellOrder(symbol, amount, params);
    }
}

// Platform Amplitude = (high-low) / ((high + low) / 2) * 100%
export class BinanceConnector extends PlatformConnector {
    constructor(
        options?: { apiKey?: string; secret?: string },
        isTestnet = true
    ) {
        super(options, isTestnet);

        this.logger = new FileLogger("binance.json");
    }

    initializeConnector(options?: {
        apiKey?: string;
        secret?: string;
    }): Exchange {
        return new ccxt.binance(options);
    }

    initPriceListenerSocket(): void {}
}

export class BybitConnector extends PlatformConnector {
    constructor(
        options?: { apiKey?: string; secret?: string },
        isTestnet = true
    ) {
        super(options, isTestnet);

        this.logger = new FileLogger("bybit.json");
    }

    initializeConnector(options?: {
        apiKey?: string;
        secret?: string;
    }): Exchange {
        return new ccxt.bybit(options);
    }

    initPriceListenerSocket(): void {}
}
