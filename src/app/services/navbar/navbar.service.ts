import { Injectable } from '@angular/core';
import { Subject, Observable, filter, tap, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private subject:Subject<string>
  public observable$:Observable<string>
  private navlist:string[];
  constructor() { 
    this.subject=new Subject();
    this.observable$=this.subject.asObservable();
    this.navlist=[];
  }
  public post(data:string){
    this.subject.next(data)
    this.observable$.pipe(
      // tap(value=>console.log(value)),
      filter(value=>
        !(this.navlist.includes(value))
      ))
    .subscribe({
      next:(data)=>{
        this.navlist.push(data)
        this.updateList();
      }
    })
  }
  public updateList(){
    return this.navlist
  }
  public getList():string[]{
    return this.navlist
  }
  public clearList(){
    this.navlist=[];
  }
}
