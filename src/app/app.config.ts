import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => initializeApp()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

export function initializeApp() {
  const foo = getSearchParam('foo') as string;
  console.log(`Initializing App... ${foo}`);
}

export const getSearchParam = (name: string): string | boolean | undefined => {
  const params = new URLSearchParams(window.location.search);

  const value = params.get(name)?.trim();
  if (!value) {
    return undefined;
  }

  const lowerValue = value.toLowerCase();
  if (lowerValue === 'true') {
    return true;
  }
  if (lowerValue === 'false') {
    return false;
  }

  return value;
};
