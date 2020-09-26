import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { YoutubePlayerModule } from 'nativescript-youtubeplayer/angular';
import { DetailsComponent } from './details/details.component';
@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule,
        YoutubePlayerModule
    ],
    declarations: [
        BrowseComponent,
        DetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
