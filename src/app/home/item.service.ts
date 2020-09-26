import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {constants } from '../shared/constants';
import { Item } from "./item";

@Injectable({
    providedIn: "root"
})
export class ItemService {

    constructor(private http: HttpClient) { }

    getItem(language:string): Observable<Item[]> {
        let url = constants.API_ENDPOINT + constants.API_Thoughts;
        return this.http.get<Item[]>(url);
    }

}
