import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import Stripe from "stripe"
import 'dotenv/config';

// import * as functions from "firebase-functions";

// Limitáljuk a max egyszerre futó konténerek számát
setGlobalOptions({ maxInstances: 10 });

// Egyszerű Hello World function
export const helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello from Firebase Functions!");
});
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY || functions.config().stripe.secret;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not set in environment variables!");
}
const stripe = new Stripe(stripeSecretKey,{
  apiVersion: "2025-07-30.basil"
})

export const createCheckoutSession = onRequest(async (req, res)=>{
  const finalPrice = req.body.price
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode: "payment",
      line_items:[
        {
          price_data: {
            currency: "huf",
            product_data: {
              name: "Csendesnap belépő"
            },
            unit_amount: finalPrice*100,
          },
          quantity: 1
        }
      ],
      success_url: req.body.successUrl,
      cancel_url: req.body.cancelUrl
    });
    res.status(200).send({ id: session.id, url: session.url });
  } catch(error: any) {
    console.error(error)
    res.status(500).send({error:error.message})
  }
})