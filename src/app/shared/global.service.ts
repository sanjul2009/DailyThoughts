import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Admob from "nativescript-admob";
import { on as applicationOn, suspendEvent, resumeEvent, ApplicationEventData } from "tns-core-modules/application";
import {constants } from '../shared/constants';

@Injectable({
    providedIn: "root"
})
export class GlobalService {

    private androidBannerId: string = "ca-app-pub-9706092585627638/4708829873";
    constructor(private http: HttpClient) { 

        applicationOn(resumeEvent, (args: ApplicationEventData)=> {
            setTimeout(()=> {this.createBanner();} , 2000);
        }); 
    }

    postToken(token:any):Observable<any> {
        let url = constants.API_ENDPOINT + constants.API_Token;
        return this.http.post(url, token);
    }

    getUserUniqueId(): Observable<string> {
        let url = constants.API_ENDPOINT + constants.API_User;
        return this.http.get<string>(url);
    }
    
    public createBanner() {
        Admob.createBanner({
            size: Admob.AD_SIZE.SMART_BANNER,
            androidBannerId: this.androidBannerId,
            margins: {
                bottom: 0
            }
        }).then(function() {
            //console.log("admob createBanner done");
        }, function(error) {
            //console.log("admob createBanner error: " + error);
            setTimeout(()=> {this.createBanner();} , 2000);
        });
   
   }
}
