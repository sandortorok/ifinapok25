import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ifinapok25',
        appId: '1:676664756383:web:6df935a4ca0af274703aaa',
        storageBucket: 'ifinapok25.firebasestorage.app',
        apiKey: 'AIzaSyBRgTRRFDShKRS9jCApl6JbPTuOYVZy3Wc',
        authDomain: 'ifinapok25.firebaseapp.com',
        messagingSenderId: '676664756383',
        measurementId: 'G-GNJYWK57HT',
      })
    ),
    provideFirestore(() => getFirestore(getApp(), 'csendesnapdb')),
  ],
};
