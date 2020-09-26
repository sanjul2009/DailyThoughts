import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { ModalComponent } from "./theme/modal.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent,
        ModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ModalComponent],
})
export class SettingsModule { }
