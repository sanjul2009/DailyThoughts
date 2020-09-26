import {ImageSource} from '@nativescript/core/image-source';

export class Item {
    id: number;
    name: string;
    role: string;
    Quote:string;
    author:string;
    imageurl:string;
    cachedImageSource : ImageSource;
    constructor(){
        this.name = "";
        this.id = 1;
        this.role = "";
    }
}
