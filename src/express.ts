import express from "express";
import { HeliusCreatePoolT, heliusHandlers } from "./helius";

// Setup express app, register routes and handlers
export const setupExpressApp = () => {
  // Create express instance
  const a = express();
  a.use(express.json());

  // Setup routes
  a.post("/solana-new-pair", (req, res) => {
    res.sendStatus(200);
    heliusHandlers().createPoolWebhookHandler(req.body as HeliusCreatePoolT[]);
  });

  // Return express instance
  return a;
};
