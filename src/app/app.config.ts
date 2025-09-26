import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideClientHydration(withEventReplay()),
     provideHttpClient()]
};

export const  API_KEY ='PMAK-68cdabf63ef35d000147ef17-56d14f9b8f41305901cdc6cac09aac7197'
export const API_LOGIN = 'https://0432eaed-df57-4183-8467-c88678cf2943.mock.pstmn.io/login';