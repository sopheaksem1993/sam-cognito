import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/pages/app.module';
import { environment } from '@env/environment';

// Amplify Configuration

import Auth from '@aws-amplify/auth';
import AWSConfig from './app/_helpers/aws-exports';
Auth.configure(AWSConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
