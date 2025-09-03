import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import Stripe from 'stripe';
import 'dotenv/config';
import cors from 'cors';
import * as admin from 'firebase-admin';

// inicializáljuk az admin SDK-t csak egyszer
if (!admin.apps.length) {
  admin.initializeApp();
}

admin.firestore().settings({
  ignoreUndefinedProperties: true,
  databaseId: 'csendesnapdb', // Here you change your DB
});
const db = admin.firestore();

// Limitáljuk a max egyszerre futó konténerek számát
setGlobalOptions({ maxInstances: 10 });

// Egyszerű Hello World function
export const helloWorld = onRequest((req, res) => {
  logger.info('Hello logs!', { structuredData: true });
  res.send('Hello from Firebase Functions!');
});
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY || functions.config().stripe.secret;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not set in environment variables!');
}
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!stripeWebhookSecret) {
  throw new Error('Stripe webhook secret is not set in environment variables!');
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
});

const corsHandler = cors({ origin: true });
export const createCheckoutSession = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method === 'OPTIONS') {
      // preflight
      res.status(204).send('');
      return;
    }
    if (req.method !== 'POST') {
      res.status(405).send({ error: 'Method not allowed' });
      return;
    }
  });
  const finalPrice = req.body.price;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'huf',
            product_data: {
              name: 'Csendesnap belépő',
            },
            unit_amount: finalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: req.body.successUrl,
      cancel_url: req.body.cancelUrl,
      metadata: { userId: req.body.userId },
    });
    res.status(200).send({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

export const stripeWebhook = onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      stripeWebhookSecret
    );
  } catch (err: any) {
    console.error('❌ Webhook signature hiba:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return; // fontos! -> így a return típusa void lesz, nem Response
  }
  console.log('✅ Signature Verified.');
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    console.log('✅ Fizetés megerősítve usernek:', userId);

    if (userId) {
      await db.collection('participants').doc(userId).set({
        paid: true,
      }, { merge: true });
      console.log(`🔄 participants/${userId} → paid = true`);
    }
  }
  res.json({ received: true });
});
