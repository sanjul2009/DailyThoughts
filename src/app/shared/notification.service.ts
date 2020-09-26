
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private subject = new Subject<any>();
    private themeSelector = new Subject<any>();
    private applyTheme = new Subject<any>();
    private firebase = new Subject<any>();
    // AdMob banner
    createBannerOnBack(message: string) {
        console.log("In notification Service")
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    notifyBannerCreation(): Observable<any> {
        return this.subject.asObservable();
    }
    // AdMob banner

    // Theme selector
    themeSelectorOnClick(className: any, _canSave:any) {
        console.log("In theme Service")
        this.themeSelector.next({ themeClass: className , canSave: _canSave});
    }

    notifyThemeClicked(): Observable<any> {
        return this.themeSelector.asObservable();
    }
    // Theme selector

    // Apply theme from local db
    applyThemeOnLoad(className: any) {
        console.log("In theme Service")
        this.applyTheme.next(className);
    }

    notifyApplyTheme(): Observable<any> {
        return this.applyTheme.asObservable();
    }
    // Apply theme from local db


    
    // Apply theme from local db
    firebaseSetup(uniquedId) {
        console.log("In theme Service")
        this.firebase.next(uniquedId);
    }

    notifyfirebaseSetup(): Observable<any> {
        return this.firebase.asObservable();
    }
    // Apply theme from local db
}