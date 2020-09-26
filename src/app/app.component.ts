import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import * as firebase from 'nativescript-plugin-firebase';
import { LocalNotifications } from "nativescript-local-notifications";
import { GlobalService } from './shared/global.service';
import {ItemService} from './home/item.service';
import { DatabaseService } from './shared/database.service';
var Sqlite = require("nativescript-sqlite");

import { NotificationService } from './shared/notification.service';

var plugin = require("nativescript-uuid");
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private database: any;
    public users: Array<any>;
    drawerHeader:string = 'nt-drawer__header ';
    drawerContent:string = 'nt-drawer__content ';

    drawerHeaderDefault:string = 'nt-drawer__header ';
    drawerContentDefault:string = 'nt-drawer__content ';

    uuid:any = plugin.getUUID();
    constructor(private router: Router,
        private routerExtensions: RouterExtensions,
        private globalService:GlobalService,
        private itemService : ItemService,
        private notificationService:NotificationService,
        private databaseService:DatabaseService) {
           
            this.users = [];

          this.notificationService.notifyfirebaseSetup().subscribe(data=>{
            console.log('token' +  JSON.stringify(data));
            this.firebaseSetup(data);
          });
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.notificationService.notifyApplyTheme().subscribe(className => 
            { 
                this.drawerHeader = this.drawerHeaderDefault + 'grad-' + className;
                this.drawerContent = this.drawerContentDefault + 'top-gradient-' + className;
            })
    }

    firebaseSetup(_uniqueId:any){
        console.log('firebase setup');
        var _this = this;
        firebase.init({
			showNotifications: true,
			showNotificationsWhenInForeground: true,

			onPushTokenReceivedCallback: (token) => {
               
                _this.sendTokenToServer(token,_uniqueId);
			},
			onMessageReceivedCallback: (message: firebase.Message) => {
                this.createNotification(message);
			  }
			}).then(() => {
				//console.log('[Firebase] Initialized');
			}).catch(error => {
				console.log('[Firebase] Initialize', { error });
            });
        
        firebase.getCurrentPushToken().then((token)=>{
            console.log('get token');
           this.databaseService.setToken(token);
        }).catch((err)=>{console.log('get token' + err);});
            
    }
    
    sendTokenToServer(token:string, _uniqueId: string){
        var obj = { tokenId : token, uniqueId :  _uniqueId};
        console.log('token' +  JSON.stringify(obj));
        this.databaseService.setToken(token);
        this.globalService.postToken(obj).subscribe(
            () =>{},
            (error)=>{}
        );
    }
    
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    public createNotification(message : any) {
        if(message.body)
        {
            LocalNotifications.schedule([{
                    id: 1,
                    title: message.title,
                    body: message.title,
                    ticker: 'The ticker',
                    badge: 1,
                    groupedMessages:[message.body], 
                    icon: 'res://icon',
                    thumbnail: 'res://icon',
                    channel: 'My Channel', 
                    at: new Date(new Date().getTime() + (2 * 1000)),
                    // actions:[
                    //     {
                    //     id:"1",
                    //       type: "button",
                    //       title: "Like",
                    //       launch: false,
                    //     },
                    //     {
                    //         id:"2",
                    //       type: "button",
                    //       title: "Comment",
                    //       launch: true
                    //     }
                    //   ]
                }]).then(
                    function(scheduledIds) {
                        console.log("Notification id(s) scheduled: " + JSON.stringify(scheduledIds));
                    },
                    function(error) {
                        console.log("scheduling error: " + error);
                    }
                );
        }
   }
}
