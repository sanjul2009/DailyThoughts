import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Subscription, from } from 'rxjs';
import { Router } from "@angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { View,getViewById } from "tns-core-modules/ui/core/view";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { registerElement } from '@nativescript/angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { GlobalData } from '../globaldata.component';
import {NotificationService} from '../shared/notification.service';
import { GlobalService } from '../shared/global.service';
import { Gif } from 'nativescript-gif';
import plugin from 'nativescript-screenshot';
import * as SocialShare from "../plugin/nativescript-social-share";
import { ShareAppComponent } from "./shareapp/dialog.component";
import { LanguageDialogueComponent } from "./language/dialog.component";
registerElement('Gif', () => Gif);
registerElement('CardView', () => CardView);
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular/modal-dialog";
 import { HomeModalComponent } from "./modal.component";
 import {DatabaseService} from '../shared/database.service';
 const permissions = require('nativescript-permissions');
 var Toast = require("nativescript-toast");

@Component({
    selector: "Home",
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
    items: Array<Item> = new Array<Item>();
    subscriptions: Subscription[];
    isBusy: boolean = false;
    isActive : boolean = false;
    actionBarThemeClass :string;
    pageBackThemeClass :string;
    selectedTheme:string = 'default'; 

    actionBarThemeClassPrefix :string = 'grad-';
    pageBackThemeClassPrefix :string = 'top-gradient-';
    selectedIndex : number;
    startSpinner() {
        this.isBusy = true;
    }

    stopSpinner() {
        this.isBusy = false;
    }

    constructor(private itemService: ItemService,
        private router: Router,
        private data:GlobalData,
        private notificationService : NotificationService,
        private globalService:GlobalService, 
        private modalService: ModalDialogService, 
        private viewContainerRef: ViewContainerRef,
        private databaseService : DatabaseService) {
            this.subscriptions = []
         }


    ngOnInit(): void {
        
        this.subscriptions.push(
            this.notificationService.notifyBannerCreation().subscribe(message => 
            { 
                    setTimeout(() => {     
                        this.createBanner();
                        },1000);
            }),
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
        this.startSpinner();

        this.itemService.getItem('en').subscribe(data => {
                this.items = data;
                setTimeout(() => {     
                    this.createBanner();
                    },1000);
                this.stopSpinner();
        },
        error => { 
            this.stopSpinner();
                }); 
                
        this.databaseService.getClassTheme();
        setTimeout(() => {     
            this.shareAppPopUp();
            }, 5000);
     }

    ngAfterViewInit() {
        setTimeout(() => {     
            this.createBanner();
            },1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onCardTap(dataToPass:Item){
        this.data.storage = dataToPass;
        this.data.className = this.selectedTheme;
        this.router.navigate(['./home/itemdetails']);
    }

    public createBanner() {
        this.globalService.createBanner();
   }

   changeThemeTap(){
    this.openPopup();
   }

   changeLanguageTap(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {
            }
        };
        this.modalService.showModal(LanguageDialogueComponent, options);
   }

   openPopup(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {
                currentThemeClass : this.selectedTheme
            }
        };
        this.modalService.showModal(HomeModalComponent, options);
    }

    shareAppPopUp(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {
            }
        };
        this.modalService.showModal(ShareAppComponent, options);
    }

    applyTheme(className:any){
        this.actionBarThemeClass = this.actionBarThemeClassPrefix + className; 
        this.pageBackThemeClass = this.pageBackThemeClassPrefix + className;
        this.selectedTheme = className;
    }

    onLongPress(index:number,item:Item) {
        //this.selectedIndex  = index;

    }

    downloadImage(args:EventData){

        permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
          .then( () => {
                let button = <View>args.object;
                button.visibility = "hidden";

                let parent = button.parent.parent;
                let card = getViewById(parent, "thoughtCard");  

                let grid_layout = button.parent;
                let logo = getViewById(grid_layout, "logo") ;  
                logo["visibility"] = "visible";

                var imagefromplugin = plugin.getImage(card);
                SocialShare.shareImage("Hi There! I found this inspiring thought on Hope App: https://tinyurl.com/y3pndvnq", imagefromplugin);

                logo["visibility"] = "hidden";
                button.visibility = "visible";
          })
          .catch( (error) => {
              console.log(' share image'+ error)
            var toast = Toast.makeText("Permission denied. Cannot share image" );
            toast.show();
          });
          }
}
