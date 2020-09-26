import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import * as imagepicker from "nativescript-imagepicker";
var bghttp = require("nativescript-background-http");
import { Progress } from "tns-core-modules/ui/progress";
import { Observable, Subject } from 'rxjs';

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    textField:string;
    public selectedIndex = 0;
    language:Array<string> = ['--Select language--','English','Hindi'];
    currentValue:number = 0;
    isVisible:boolean = false;
    private updateProgress = new Subject<any>();
    subscription:any;
    constructor() {
        // Use the component constructor to inject providers.
        this.subscription = [];
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.subscription.push(
            
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onPicImage(){
        
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        let _this = this;
        context
            .authorize()
            .then(function() {
                return context.present();
            })
            .then(function(selection) {
                selection.forEach(function(selected) {
                    _this.uploadFile(selected.android,_this)
                   
                });
            }).catch(function (e) {
                // process error
            });
    }

    uploadFile(filePath, _this){
            // file path and url
    var file =  filePath;
    var url = "https://dailythoughtsappservicebeta.azurewebsites.net/api/file/";
    var name = file.substr(file.lastIndexOf("/") + 1);
    
    // upload configuration
    var session = bghttp.session("image-upload");
    var request = {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data;",
                "Content-Length" : "2147483647"
            },
            description: "Uploading " + name
        };

        var params = [
            { name: "fileToUpload", filename: file, mimeType: "image/jpeg" }
        ];
        var task = session.multipartUpload(params, request);
        _this.isVisible = true;
        task.on("progress", this.progressHandler);
        task.on("error", this.errorHandler);
        task.on("complete", this.completeHandler);
        
    }

    progressHandler(e) {  
        debugger; 
        console.log("Uploaded " + e.currentBytes);
        this.currentValue = Number(((e.currentBytes / e.totalBytes) * 100).toFixed());
        console.log("currentValue " + this.currentValue);
         
    }
    completeHandler(e) {
        console.log("received " + e.responseCode + " code");
        setTimeout(() => {     
            this.isVisible = false;
            },3000);
    }
    errorHandler(e) {
        console.log("Error " + e.responseCode);
        console.log("Error " + e.response.getBodyAsString());
    }

    // updateProgressCaller(value:any){
    //     this.currentValue = value;
    //     console.log("currentValue " + this.currentValue);
    // }
    // onUpdateProgress(value:any) {
    //     console.log("In theme Service")
    //     this.updateProgress.next(value);
    // }

    // updateProgressCal(): Observable<any> {
    //     return this.updateProgress.asObservable();
    // }

}
