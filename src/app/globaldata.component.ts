import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {

    public storage: any;
    className : string = 'default';
    public constructor() { }

}