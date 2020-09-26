import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from './notification.service';

import { GlobalService } from './global.service';

var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: "root"
})
export class DatabaseService {
    database: any;
    uniqueId : string;
    token:string;
    constructor(private http: HttpClient,
        private notificationService:NotificationService,
        private _globalService : GlobalService) { 

            (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, uniqueId TEXT)").then(id => {
                this.database = db;
                this.fetch();

            }, error => {
                //console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            //console.log("OPEN DB ERROR", error);
        });
          
    }

    fetch() {
        console.log("Inside fetch");
        var _this = this;
        this.database.get('SELECT uniqueId FROM users', function(err, rows) {
            let users = [];
            console.log("record length  : " + rows);
            if(rows && rows.length > 0){
                _this.isColumnExists('themeClassName',3);
                _this.isColumnExists('SelectedLang',4);
                _this.uniqueId = rows[0];
                users.push(rows[0]);
               setTimeout(()=>{console.log('fetch - _this.notificationService.firebaseSetup'); _this.notificationService.firebaseSetup(users[0]);},1000);
            }
            else{
                _this._globalService.getUserUniqueId().subscribe(
                            data =>{
                            console.log('data - ' + data);
                            _this.insert(data);
                            setTimeout(()=>{console.log('_this._globalService - _this.notificationService.firebaseSetup');_this.notificationService.firebaseSetup(data);},1000);
                        });
            }
          });
    }

    insert(uniqueId:any) {
        this.uniqueId = uniqueId;
        this.database.execSQL("INSERT INTO users (uniqueId) VALUES (?)", [uniqueId]).then(id => {
            console.log("INSERT RESULT", id , uniqueId);
            this.isColumnExists('themeClassName',3);
            this.isColumnExists('SelectedLang',4);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    isColumnExists (columnName:any , position:any) {
        let _this = this;
        this.database.get("SELECT * FROM users;", function(error, row) {
            console.log("isColumnExists " + row + "length" + row.length);
            if(row && row.length < position)
            {
                
                _this.addColumnToUserTable(columnName);
            }
        });
    }
    addColumnToUserTable(columnName:any) {
        this.database.get("ALTER TABLE users ADD COLUMN " + columnName + " text", function(error, id) {

        });

    }

    UpdateColumnValue(className:string, columnName:string) {
        let userId = this.uniqueId;
        let query = "UPDATE users SET "+ columnName + " = (?) Where uniqueId = (?)";

        this.database.execSQL(query,[className,userId]).then(id => {
        }, error => {
            console.log("updateThemeClassInUser ERROR", error);
        });
    }
    updateThemeClassInUser(className:any) {
        this.UpdateColumnValue(className,'themeClassName');
    }

    
    updateLanguageInUser(selectedLanguage:any) {
        this.UpdateColumnValue(selectedLanguage,'SelectedLang');
    }

    getClassTheme() {
        let _this = this;
        return this.database.get('SELECT themeClassName FROM users',function(error,rows){
            let className = rows !== null && (rows[0] !== null && rows[0] !== undefined) ? rows[0] : 'default';
            _this.notificationService.applyThemeOnLoad(className);
        });
    }
    setToken(token:string){
        this.token = token;
    }
    getToken(){
       return this.token;
    }
}
