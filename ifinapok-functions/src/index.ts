import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Limitáljuk a max egyszerre futó konténerek számát
setGlobalOptions({ maxInstances: 10 });

// Egyszerű Hello World function
export const helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello from Firebase Functions!");
});