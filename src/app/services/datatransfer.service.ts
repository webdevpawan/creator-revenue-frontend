import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  constructor() { }

  private loginData = new BehaviorSubject<any>(null);

  getLoginData$ = this.loginData.asObservable();

  setData(data: any) {
    this.loginData.next(data);
  }

  
  private linkData = new BehaviorSubject<any>(null);

  getLinkData$ = this.loginData.asObservable();

  setLinkData(data: any) {
    this.linkData.next(data);
  }
}
