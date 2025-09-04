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
  async checkout(price: number, firebaseId: string, name:string, email:string) {
  let body = {price, successUrl: window.location.origin + '/success', cancelUrl: window.location.href, userId: firebaseId, name, email}
  try {
    // Backend function meghívása
    const session = await firstValueFrom(
      this.http.post<{ id: string, url: string }>(this.functionUrl, body)
    );

    // Stripe inicializálás
    const stripe = await loadStripe(
      'pk_live_51Q2HJ2IEpPypxL3pZydPS4VRIUkKZL0gUdehja0BPkEkws1ArthkNSUCDDJRNwgTMCk3zTJ1pj7AqDCHdkdDzDzg00JSiOmBsv'
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
