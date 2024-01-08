import TelegramBot from "node-telegram-bot-api";
import { NewPoolData } from "./helius";

const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID!;
const NEW_POOLS_THREAD_ID = process.env.TELEGRAM_NEW_POOLS_THREAD_ID!;

export class SolTradingTelegramBot extends TelegramBot {
  private static instance: SolTradingTelegramBot;

  private constructor() {
    super(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });
  }

  public static getInstance(): SolTradingTelegramBot {
    if (!SolTradingTelegramBot.instance) {
      SolTradingTelegramBot.instance = new SolTradingTelegramBot();
    }
    return SolTradingTelegramBot.instance;
  }

  public notifyOfNewPool(newPoolData: NewPoolData) {
    try {
      this.sendMessage(
        TELEGRAM_GROUP_ID,
        `
New Liquidity Pool On Raydium!\n
Liquidity Pool Public Key: ${newPoolData.poolPublicKey}\n
Liquidity Pool Mint Public Key: ${newPoolData.mintPublicKey}\n
Solscan of Liquidity Pool: https://solscan.io/account/${newPoolData.poolPublicKey}\n
Solscan of Token: https://solscan.io/token/${newPoolData.mintPublicKey}\n
Dexscreener URL: https://dexscreener.com/solana/${newPoolData.poolPublicKey}\n
`,
        { message_thread_id: Number(NEW_POOLS_THREAD_ID) },
      );
    } catch (error) {}
  }
}
