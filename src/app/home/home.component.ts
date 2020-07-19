import { Component, OnInit,AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";
import { registerElement } from '@nativescript/angular/element-registry';
import { CardView } from '@nstudio/nativescript-cardview';

import { GlobalData } from '../globaldata.component';
import {NotificationService} from '../shared/notification.service';
registerElement('CardView', () => CardView);

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit,AfterViewInit {
    items: Array<Item> = new Array<Item>();
    firstThought : Item;
    subscriptions: Subscription[];
    constructor(private itemService: ItemService,
        private router: Router,
        private data:GlobalData,
        private notificationService : NotificationService) {
            this.subscriptions = []
         }


    ngOnInit(): void {
        console.log("ngOnInit");
        this.subscriptions.push(
            this.notificationService.notifyBannerCreation().subscribe(message => 
            { 
                    setTimeout(() => {     
                        this.createBanner();
                        },1000);
            })
        );
        this.itemService.getItem(1).subscribe(data => {
            this.items = data;
       });
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        setTimeout(() => {     
            this.createBanner();
            },1000);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onCardTap(dataToPass:Item){
        console.log("inside onCardTap  ")
        this.data.storage = dataToPass;
        this.router.navigate(['./home/itemdetails']);
    }

    public createBanner() {
        this.itemService.createBanner();
   }
}
