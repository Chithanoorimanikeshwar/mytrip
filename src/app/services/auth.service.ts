import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticate=false;

  constructor(
  ) { }
  public next(bool:boolean){
    this.isAuthenticate=bool;
  }
  public isAuthenticated():boolean{
    console.log('gaurd',this.isAuthenticate);
    return this.isAuthenticate

  }
}
