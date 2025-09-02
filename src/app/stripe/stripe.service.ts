import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private functionUrl = `${environment.functionsBaseUrl}/createCheckoutSession`;
  constructor(private http: HttpClient) {}
  async checkout(price: number, firebaseId: string) {
  let body = {price, successUrl: window.location.origin + '/success', cancelUrl: window.location.href, userId: firebaseId}
  try {
    // Backend function meghívása
    const session = await firstValueFrom(
      this.http.post<{ id: string, url: string }>(this.functionUrl, body)
    );

    // Stripe inicializálás
    const stripe = await loadStripe(
      'pk_test_51Mk5BQHyufV5ybJC4YV5ET0tkzb60r2BV6XBekKcYSx3mPKG7wNAt5R2FYaeQrjzNakuSh2Vpc5y8MIRD6KTb0Ao00VRd0piNB'
    );

    if (!stripe) throw new Error('Stripe init error');

    // Redirect Stripe Checkout-ra
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Stripe checkout hiba:', error.message);
    }
  } catch (err) {
    console.error('Hiba a checkout folyamatban:', err);
  }
}
}
