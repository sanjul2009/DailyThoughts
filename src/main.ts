// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { registerElement } from '@nativescript/angular/element-registry';
import { AppModule } from "./app/app.module";
import { enableProdMode } from '@angular/core';
import { createNotificationChannel } from "./app/utils/andriod";
import * as application from "tns-core-modules/application";

require("nativescript-plugin-firebase");
require ("nativescript-local-notifications");
enableProdMode();

if (application.android) {
    application.android.on(application.AndroidApplication.activityCreatedEvent, (args: any) => {
      createNotificationChannel({
        id: 'fcm_default_channel',
        name: 'Hope channel',
        description: 'Channel to publish daily thoughts over cloud messaging!',
        soundFilename: 'default'
      });
    });
  }

platformNativeScriptDynamic().bootstrapModule(AppModule);
