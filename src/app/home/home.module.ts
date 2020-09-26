import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { ItemDetailsComponent } from "./details/item.component";

import { HomeModalComponent } from "./modal.component";
import { ShareAppComponent } from "./shareapp/dialog.component";

import { LanguageDialogueComponent } from "./language/dialog.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        TNSCheckBoxModule
    ],
    declarations: [
        HomeComponent,
        ItemDetailsComponent,
        HomeModalComponent,
        ShareAppComponent,
        LanguageDialogueComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [HomeModalComponent,ShareAppComponent,LanguageDialogueComponent],
    
})
export class HomeModule { }
