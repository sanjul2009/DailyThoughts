import { Component, OnInit,AfterViewInit } from "@angular/core";
import { registerElement } from '@nativescript/angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';
import { Item } from "../item";
import { RouterExtensions } from "nativescript-angular/router";

import {GlobalData} from '../../globaldata.component';
import{ItemService} from '../item.service'
import { NotificationService } from '../../shared/notification.service';


registerElement('CardView', () => CardView);

@Component({
    selector: "ns-itemdetails",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.css"]
})
export class ItemDetailsComponent implements OnInit,AfterViewInit {
    itemDetails : Item;
    constructor(
        private routerExtensions: RouterExtensions,
        private data:GlobalData,
        private itemService:ItemService,
        private notificationService:NotificationService) { }

    ngOnInit(): void {
        this.itemDetails = this.data.storage;
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
       this.itemService.createBanner();
   }
}
