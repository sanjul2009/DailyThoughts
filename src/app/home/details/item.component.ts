import { Component, OnInit,AfterViewInit,ViewChild,ElementRef } from "@angular/core";
import { registerElement } from '@nativescript/angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { View,getViewById } from "tns-core-modules/ui/core/view";
import plugin from 'nativescript-screenshot';
import * as SocialShare from "nativescript-social-share";


import { Item } from "../item";
import {GlobalData} from '../../globaldata.component';
import{ItemService} from '../item.service';
import{GlobalService} from '../../shared/global.service'
import { NotificationService } from '../../shared/notification.service';

const permissions = require('nativescript-permissions');
var Toast = require("nativescript-toast");

registerElement('CardView', () => CardView);
@Component({
    selector: "ns-itemdetails",
    templateUrl: './item.component.html',
    styleUrls: ['../home.component.css']
})
export class ItemDetailsComponent implements OnInit,AfterViewInit {
    itemDetails : Item;
    actionBarThemeClass :string;
    pageBackThemeClass :string;
    selectedTheme:string = 'default'; 

    actionBarThemeClassPrefix :string = 'grad-';
    pageBackThemeClassPrefix :string = 'top-gradient-';

    constructor(
        private routerExtensions: RouterExtensions,
        private data:GlobalData,
        private itemService:ItemService,
        private notificationService:NotificationService,
        private globalService : GlobalService) { }
    ngOnInit(): void {
        this.itemDetails = this.data.storage;
        this.actionBarThemeClass = this.actionBarThemeClassPrefix + this.data.className; 
        this.pageBackThemeClass = this.pageBackThemeClassPrefix + this.data.className;
    }
    ngAfterViewInit() {
        console.log("Creating banner");
        setTimeout(() => {     
         this.createBanner();
         },1000);
    }
    goBack(): void {
        this.notificationService.createBannerOnBack("Create banner");
        this.routerExtensions.back();
    }
    public createBanner() {
       this.globalService.createBanner();
   }

   downloadImage(args:EventData){

        permissions.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
        .then( () => {
                let button = <View>args.object;
                let parent = button.parent;
                let card = getViewById(parent, "thoughtCard"); 
                var imagefromplugin = plugin.getImage(card);
                SocialShare.shareImage("Hi There! I found this inspiring thought on Hope App!!!: https://tinyurl.com/y3pndvnq",imagefromplugin);
        })
        .catch( () => {
            var toast = Toast.makeText("Permission denied. Cannot share image");
            toast.show();
        });
  }
}   
