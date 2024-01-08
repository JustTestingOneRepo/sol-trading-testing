import * as dotenv from "dotenv";
dotenv.config();
import { setupExpressApp } from "./express";
import { SolTradingTelegramBot } from "./telegram";

// Setup telegram bot
SolTradingTelegramBot.getInstance();

const app = setupExpressApp();

const port = 3447;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
