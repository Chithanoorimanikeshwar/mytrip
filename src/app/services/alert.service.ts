import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject:BehaviorSubject<string>
  public observable:Observable<string>
  constructor() {
    this.subject=new BehaviorSubject("");
    this.observable=this.subject.asObservable()
   }
   public get():Observable<string>{
    return this.observable;
   }
   public post(data:string):void{
    this.subject.next(data);
   }
}
