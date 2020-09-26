import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {constants } from '../shared/constants';
import { Video } from "./video.model";

@Injectable({
    providedIn: "root"
})
export class VideoService {

    constructor(private http: HttpClient) { }

    getItem(language:string): Observable<Video[]> {
        let url = constants.API_ENDPOINT + constants.API_Video;
        return this.http.get<Video[]>(url);
    }

}
