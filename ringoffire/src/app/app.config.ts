import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-995e2","appId":"1:523426542269:web:55ed52f6cb1aa14acafdd4","storageBucket":"ring-of-fire-995e2.appspot.com","apiKey":"AIzaSyBphd1tbIfP-O2dBmtAW5DXU13t-Bp6KX8","authDomain":"ring-of-fire-995e2.firebaseapp.com","messagingSenderId":"523426542269"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
