import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {DatabaseService} from '../../shared/database.service';
import {NotificationService} from '../../shared/notification.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Video } from "../video.model";
import { VideoService } from "../video.service";
import { GlobalService } from '../../shared/global.service';
import {GlobalData} from '../../globaldata.component';
@Component({
    selector: "video-details",
    templateUrl: "./details.component.html"
})
export class DetailsComponent implements OnInit {

    
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
        private data:GlobalData,
        private routerExtensions: RouterExtensions) {
            this.subscriptions = []
            
    }

    ngOnInit(): void {
        
            this.notificationService.notifyApplyTheme().subscribe(className => 
                { 
                    this.applyTheme(className);
                });

        this.databaseService.getClassTheme();

        this.startSpinner();
    
        this.videoService.getItem('en').subscribe(data => {
                this.items = data;
                setTimeout(() => {     
                    this.globalService.createBanner();
                    },1000);
                this.stopSpinner();
                },
                error => { 
                    this.stopSpinner();
                        }); 

        this.videoId = this.data.storage;
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

    goBack(): void {
        this.notificationService.createBannerOnBack("Create banner");
        this.routerExtensions.back();
    }
}
