import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from '../environment/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GithubAuthProvider } from 'firebase/auth';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
      
    ]),
    AngularFireAuthModule,
    AngularFireModule,
    FormsModule,
    AngularFireAuth
  ]
};


