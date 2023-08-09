import { Injectable } from '@angular/core';
import {  Observable, Subject } from 'rxjs';
import { buslist } from 'src/app/models/searchform.model';

@Injectable({
  providedIn: 'root'
})
export class UtiliteService {

  private subject:Subject<buslist[] >
  public observable$:Observable<buslist[] >
  constructor() { 
    this.subject=new Subject();
    this.observable$=this.subject.asObservable();
  }
  public post(data:buslist[]){
    setTimeout(() => {
      this.subject.next(data);
    }, 1000);
  }
  public get():Observable<buslist[] >{
    return this.observable$
  }
}
