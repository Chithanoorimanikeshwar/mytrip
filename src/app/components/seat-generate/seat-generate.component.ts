import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { buslist } from 'src/app/models/searchform.model';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import {status} from './seats/seats.component'
import { Store } from '@ngxs/store';
import { UserInfo } from 'src/app/ngxs/store/store.service';
type seatSummary={
  seat:string,
  fare:number,
  class:string,
  
}
type disSelected={
  seat:string,
  fare:number
  
}

@Component({
  selector: 'app-seat-generate',
  templateUrl: './seat-generate.component.html',
  styleUrls: ['./seat-generate.component.css']
})
export class SeatGenerateComponent implements OnInit{
  private busid:number |null;
  public reviewComp:boolean
  public selectedseat:seatSummary | disSelected;
  public busname="";
  public activateChildSeat:boolean
  public seatsPosition=[];
  public busData: buslist;
  public noOfSeats=16;
  constructor(
    private router:ActivatedRoute,
    private navbar:NavbarService,
    private store:Store
  ){
    this.busData={} as buslist;
    this.busid=null;
    this.activateChildSeat=false;
    this.reviewComp=false;
    this.selectedseat={} as seatSummary | disSelected;
  }
  ngOnInit(){
    this.navbar.post("Seats");
    this.router.queryParams.subscribe({
      next:(data)=>{
        this.busid=data['id'];
      }
    })
    this.store.select(UserInfo.getSelectedBus).subscribe({
      next:(res)=>{
        this.busData=res;
        this.activateChildSeat=true;
        this.seatsPosition=res.seatsPosition;
        this.busname=res.bus;
      }
    })
  }
  public selectedSeat(data:status){
   switch(data.selected){
    case true:
      this.selectedseat={
        seat:data.id,
        fare:this.busData.Fare,
        class:this.busData.coach,
        
      }
      break;
    case false:

      this.selectedseat={
        seat:data.id,
        fare:this.busData.Fare
      }
      break;
   }
  }
  public summaryEvent(data:string){
    switch(data){
      case 'edit':{
      
        this.reviewComp=true;
        break;
      }
    }
    return
  }
}
