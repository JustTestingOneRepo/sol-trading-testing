import { SolTradingTelegramBot } from "./telegram";

export type HeliusCreatePoolT = {
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      mint: string;
      rawTokenAmount: {
        decimals: 6;
        tokenAmount: string;
      };
      tokenAccount: string;
      userAccount: string;
    }[];
  }[];
  description: string;
  events: any;
  fee: number;
  feePayer: string;
  instructions: {
    accounts: string[];
    data: string;
    innerInstructions: {
      accounts: string[];
      data: string;
      programId: string;
    }[];
    programId: string;
  }[];
  nativeTransfers: {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
  }[];
  signature: string;
  slot: number;
  source: string;
  timestamp: number;
  tokenTransfers: {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
  }[];
  transactionError: any;
  type: string;
};

export type NewPoolData = {
  poolPublicKey: string;
  mintPublicKey: string;
};

export const heliusHandlers = () => {
  const createPoolWebhookHandler = (requestBody: HeliusCreatePoolT[]) => {
    const createdPools = requestBody.map((e) => {
      if (!e.accountData || e.accountData.length <= 0) {
        return null;
      }

      const poolAccountData = e.accountData.find((e) => {
        return e.nativeBalanceChange === 6124800;
      });

      if (!poolAccountData) {
        return null;
      }

      if (!e.tokenTransfers || e.tokenTransfers.length <= 0) {
        return null;
      }

      const mint = e.tokenTransfers[0].mint;

      const newPoolData: NewPoolData = {
        poolPublicKey: poolAccountData.account,
        mintPublicKey: mint,
      };

      return newPoolData;
    });

    for (const pool of createdPools) {
      if (!pool) {
        continue;
      }

      console.log("New Liquidity Pool!");
      console.log(`Liquidity Pool Public Key: ${pool.poolPublicKey}`);
      console.log(`Mint of Liquidity: ${pool.mintPublicKey}\n`);

      SolTradingTelegramBot.getInstance().notifyOfNewPool(pool);
    }
  };

  return {
    createPoolWebhookHandler,
  };
};
