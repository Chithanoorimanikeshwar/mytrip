import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { status } from '../seats/seats.component';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SeatsSummary } from 'src/app/ngxs/action/action.service';

export type seatSummary={
  seat:string,
  fare:number,
  class:string,
}
type disSelected={
  seat:string,
  fare:number
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnChanges{
@Input() selectedSeat:seatSummary | disSelected;
@Output() buttonclicked=new EventEmitter<string>();
public buttonStatus:string;
public seatsSummary:seatSummary[];
public totalAmount:number;
public editButton:boolean;
constructor(
  private router:Router,
  private store:Store
){
  this.selectedSeat={} as seatSummary | disSelected;
  this.seatsSummary=[];
  this.buttonStatus="Review Tickets";
  this.totalAmount=0;
  this.editButton=false;
}
  
  ngOnChanges(changes: SimpleChanges): void {
    if("class" in this.selectedSeat){
      this.seatsSummary.push(this.selectedSeat);
      this.totalAmount+=this.selectedSeat.fare
    }
    else{
      // console.log('seat disselected');
        this.seatsSummary=this.seatsSummary.filter((item)=>{
        if(item.seat==this.selectedSeat.seat){
          this.totalAmount-=this.selectedSeat.fare
          return false;
        }
        return true;
    })
  }

    console.log(this.seatsSummary);
  }
  public buttonClicked(){
    if(this.editButton){
      this.router.navigateByUrl("/userinfo");
      return
    }
      this.store.dispatch(new SeatsSummary(this.seatsSummary))
    this.buttonclicked.emit('edit');
    this.buttonStatus="conform Tickets";
    this.editButton=true;
  }

  
}
