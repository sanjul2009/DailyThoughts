import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Item } from "./item";
import * as Admob from "nativescript-admob";

@Injectable({
    providedIn: "root"
})
export class ItemService {

    private androidBannerId: string = "ca-app-pub-9706092585627638/4708829873";
    constructor(private http: HttpClient) { }

    getItem(id: number): Observable<Item[]> {
        let url = 'https://dailythoughtsappservice.azurewebsites.net/api/thoughts';
        let response: any = new Item();
        return this.http.get<Item[]>(url);
    }

    public createBanner() {
        Admob.createBanner({
            size: Admob.AD_SIZE.SMART_BANNER,
            androidBannerId: this.androidBannerId,
            margins: {
                bottom: 0
            }
        }).then(function() {
            console.log("admob createBanner done");
        }, function(error) {
            console.log("admob createBanner error: " + error);
        });
   
   }
}
