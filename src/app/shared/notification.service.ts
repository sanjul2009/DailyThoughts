
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private subject = new Subject<any>();

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
}