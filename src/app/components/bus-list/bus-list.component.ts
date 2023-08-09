import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  tap } from 'rxjs';
import { buslist } from 'src/app/models/searchform.model';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { UtiliteService } from 'src/app/services/utilite/utilite.service';

import { Store } from '@ngxs/store';
import { UserInfo } from 'src/app/ngxs/store/store.service';
import { SetSelectedBus } from 'src/app/ngxs/action/action.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit{
  public busList:buslist[] | null ;
  public loading:boolean
  constructor(
    private navbar:NavbarService,
    private route:Router,
    private store:Store

  ){
    this.busList=[];
    this.loading=true;
  }
  ngOnInit(): void {
      this.navbar.post("AvailableBuses");
      this.store.select(UserInfo.getAvailableBuses).pipe(
        tap((res)=>{
          console.log(res);
          this.busList=res.availabeBus;
          this.loading=false;
        })
      ).subscribe()
    }
  public checkSeats(data:any):boolean{  
    if(data!=0){
      return true;
    }
    else{
      return false
    }
 
}
  public bookTicket(bus:buslist){
    const queryParams = {
      id:bus.id
    } 
    this.store.dispatch(new SetSelectedBus(bus));
    this.route.navigate(['makemytrip/seats'],{queryParams})
    
  }
}
