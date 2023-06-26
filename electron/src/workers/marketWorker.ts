import { parentPort, getEnvironmentData } from "node:worker_threads";
import { BinanceConnector, BybitConnector } from "@/classes/PlatformConnector";

const binance = new BinanceConnector({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET_KEY,
});

binance.getTokenMarket("BTC").then((btnMarketData) => {
    parentPort!.postMessage("Get BTC data success");
    binance.logger.saveData(btnMarketData);
});

// const binance = new ccxt.binance();

// async function getBinanceBalance() {
//     try {
//         const balance = await binance.fetchBalance();
//         // console.log("Balance: ", balance);

//         await fs.writeFile(
//             path.join(__dirname, "data.json"),
//             JSON.stringify(balance, undefined, 4)
//         );
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// }

// // getBinanceBalance();

// async function getBinancePrice() {
//     try {
//         const btcMarketPrice = await binance.fetchOHLCV("BTC/USDT", "1m");

//         await fs.writeFile(
//             path.join(__dirname, "data.json"),
//             JSON.stringify(
//                 btcMarketPrice.map((price: number[]) => ({
//                     time: new Date(price[0]).toTimeString(),
//                     openPrice: price[1],
//                     highPrice: price[2],
//                     lowPrice: price[3],
//                     close: price[4],
//                     volume: price[5],
//                 })),
//                 undefined,
//                 4
//             )
//         );
//         console.log("log worker");

//         parentPort!.postMessage("Get data success");
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// }

// async function getBybitPrice() {
//     try {
//         const btcMarketPrice = await bybit.fetchOHLCV("BTC/USDT", "1m");

//         await fs.writeFile(
//             path.join(__dirname, "data-bybit.json"),
//             JSON.stringify(
//                 btcMarketPrice.map((price: number[]) => ({
//                     time: new Date(price[0]).toTimeString(),
//                     openPrice: price[1],
//                     highPrice: price[2],
//                     lowPrice: price[3],
//                     close: price[4],
//                     volume: price[5],
//                 })),
//                 undefined,
//                 4
//             )
//         );
//         console.log("log worker");

//         parentPort!.postMessage("Get data success");
//     } catch (error) {
//         console.log("Error: ", error);
//     }
// }

// // getBybitPrice();

// // getBinancePrice();
