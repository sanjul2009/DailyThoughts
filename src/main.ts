// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import { AlertTypesConstants, StoreUpdate } from 'nativescript-store-update'


StoreUpdate.init({
  majorUpdateAlertType: AlertTypesConstants.FORCE,
  notifyNbDaysAfterRelease: 0,
  alertOptions: {
    title: 'Attention please',
    message: 'Your app is out of date',
  },
})
platformNativeScriptDynamic().bootstrapModule(AppModule);
