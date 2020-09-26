import { Component, OnInit,ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Subscription, from } from 'rxjs';
import {NotificationService} from '../shared/notification.service';
import {DatabaseService} from '../shared/database.service';
import * as SocialShare from "nativescript-social-share";
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular/modal-dialog";
 import { ModalComponent } from "./theme/modal.component";
@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    actionBarThemeClass :string;
    actionBarThemeClassPrefix :string = 'grad-';

    pageBackThemeClass :string;
    selectedTheme:string = 'default'; 
    
    pageBackThemeClassPrefix :string = 'top-gradient-';
    items:Array<string>;
    subscriptions: Subscription[];
    constructor(
        private notificationService : NotificationService,
        private databaseService : DatabaseService,
        private viewContainerRef: ViewContainerRef,
        private modalService : ModalDialogService) {
        // Use the component constructor to inject providers.
        this.subscriptions = [];
    }

    ngOnInit(): void {
        this.subscriptions.push(
        this.notificationService.notifyThemeClicked().subscribe(myObj => 
            { 
                console.log('className - ' + JSON.stringify(myObj));   
                this.applyTheme(myObj["themeClass"]);
                if(myObj["canSave"])
                        this.databaseService.updateThemeClassInUser(myObj["themeClass"]);
            }),

        this.notificationService.notifyApplyTheme().subscribe(className => 
            { 
                this.applyTheme(className);
            })
        );
            this.databaseService.getClassTheme();
            this.items = new Array<string>();
            
            this.items.push('Theme');
            this.items.push('Language');
            this.items.push('User Token');
            this.items.push(this.databaseService.getToken());
    }
    applyTheme(className:any){
        console.log()
        this.actionBarThemeClass = this.actionBarThemeClassPrefix + className; 
        this.pageBackThemeClass = this.pageBackThemeClassPrefix + className;
        this.selectedTheme = className;
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onTap(text){
        switch(text) { 
            case "Theme": { 
                    this.openPopup();
               break; 
            } 
            case "Language": { 
               
                    
               break; 
            } 
            default: { 
                SocialShare.shareText(text);
               break; 
            } 
         } 

    }

    openPopup(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {
                currentThemeClass : this.selectedTheme
            }
        };
        this.modalService.showModal(ModalComponent, options);
    }
}
