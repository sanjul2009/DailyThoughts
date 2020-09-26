import { Component, OnInit,AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {DatabaseService} from '../shared/database.service';
import {NotificationService} from '../shared/notification.service';
import { Router } from "@angular/router";

import { Video } from "./video.model";
import { VideoService } from "./video.service";
import { GlobalService } from '../shared/global.service';
import { GlobalData } from '../globaldata.component';
@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit, AfterViewInit {

    
    actionBarThemeClass :string;
    actionBarThemeClassPrefix :string = 'grad-';

    pageBackThemeClass :string;
    selectedTheme:string = 'default'; 
    
    pageBackThemeClassPrefix :string = 'top-gradient-';
    subscriptions:[];
    items: Array<Video> = new Array<Video>();
    isBusy:boolean = false;
    videoId:string;
    constructor(private videoService: VideoService,
        private databaseService : DatabaseService,
        private notificationService : NotificationService,
        private globalService : GlobalService,
        private router: Router,
        private data:GlobalData,) {
            this.subscriptions = []
            
    }

    ngOnInit(): void {
        
            this.notificationService.notifyApplyTheme().subscribe(className => 
                { 
                    this.applyTheme(className);
                });

        
        this.notificationService.notifyBannerCreation().subscribe(message => 
            { 
                    setTimeout(() => {     
                        this.globalService.createBanner();
                        },1000);
            }),

        this.databaseService.getClassTheme();
        this.startSpinner();
        this.videoService.getItem('en').subscribe(data => {
                this.items = data;
                setTimeout(() => {   
                    console.log(' on back craete anner');     
                    this.globalService.createBanner();
                    },1000);
                this.stopSpinner();
                    },
                    error => { 
                        this.stopSpinner();
        }); 
        
    }

    ngAfterViewInit() {
        setTimeout(() => {  
            console.log('craete anner');   
            this.globalService.createBanner();
            },1000);
    }

    startSpinner() {
        this.isBusy = true;
    }

    stopSpinner() {
        this.isBusy = false;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    applyTheme(className:any){
        this.actionBarThemeClass = this.actionBarThemeClassPrefix + className; 
        this.pageBackThemeClass = this.pageBackThemeClassPrefix + className;
        this.selectedTheme = className;
    }

    onCardTap(item:Video){
        console.log("video set");
        this.videoId = item.videoId;
        this.data.storage = this.videoId;
        this.data.className = this.selectedTheme;
        this.router.navigate(['./browse/details']);
    }
}
