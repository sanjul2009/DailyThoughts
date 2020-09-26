import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular/modal-dialog";
import * as SocialShare from "nativescript-social-share";
import * as utils from "tns-core-modules/utils/utils";

@Component({
    selector: "modal",
    templateUrl: 'dialog.component.html'
})
export class LanguageDialogueComponent implements OnInit {
    message : string= "We would like to hear from you!! Do let us know what you think of Hope app. Also, help us grow, spread the word, share the app";
    constructor(private params: ModalDialogParams) {}
        theme:any;
    ngOnInit() {
    }

    close() {
        this.params.closeCallback();
    }

    share(){
        SocialShare.shareText("Hi There! I found this inspiring thought on Hope App!!!: https://tinyurl.com/y3pndvnq");
       }

    rate(){
        
        utils.openUrl("market://details?id=org.nativescript.DailyThoughts");
   }
}

