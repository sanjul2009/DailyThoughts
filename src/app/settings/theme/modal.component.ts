import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular/modal-dialog";
import {NotificationService} from '../../shared/notification.service';

@Component({
    selector: "modal",
    templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit {

    currentThemeClass:string;
    selectedThemeClass:string;
    constructor(private params: ModalDialogParams,
        private notificationService : NotificationService) {}
        theme:any;
    ngOnInit() {

        this.theme = [
            {
                className:"light",
                class:"grad-light",
                displayName:"Light"
            },
            {
                className:"dark",
                class:"grad-dark",
                displayName:"Dark"
            },
            {
                className:"default",
                class:"grad-default",
                displayName:"Theme-1"
            },
            {
                className:"purple",
                class:"grad-purple",
                displayName:"Theme-2"
            },
            {
                className:"piglet",
                class:"grad-piglet",
                displayName:"Theme-3"
            },
            {
                className:"gray",
                class:"grad-gray",
                displayName:"Theme-4"
            },
            {
                className:"socialive",
                class:"grad-socialive",
                displayName:"Theme-5"
            },
            {
                className:"dusk",
                class:"grad-dusk",
                displayName:"Theme-6"
            },
            {
                className:"green-beach",
                class:"grad-green-beach",
                displayName:"Theme-7"
            }
        ]
        this.currentThemeClass = this.params.context.currentThemeClass;
        console.log('currentThemeClass : - ' + this.currentThemeClass);
    }

    close() {
        this.selectedThemeClass = this.currentThemeClass;
        this.notificationService.themeSelectorOnClick(this.selectedThemeClass, false);
        this.params.closeCallback();
    }

    onThemeTap(className:string){
        this.selectedThemeClass = className;
        this.notificationService.themeSelectorOnClick(this.selectedThemeClass, false);
    }

    apply(){
        this.notificationService.themeSelectorOnClick(this.selectedThemeClass, true);
        this.params.closeCallback();
    }
}

