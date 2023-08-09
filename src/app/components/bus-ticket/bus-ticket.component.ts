import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { buslist, user } from 'src/app/models/searchform.model';
import { UserInfo, UserStateModel } from 'src/app/ngxs/store/store.service';
import { seatSummary } from '../seat-generate/summary/summary.component';

@Component({
  selector: 'app-bus-ticket',
  templateUrl: './bus-ticket.component.html',
  styleUrls: ['./bus-ticket.component.css']
})
export class BusTicketComponent implements OnInit{
private userDetails$:Observable<user>
public userDetails:user;
public seatNumber:seatSummary[];
public netFare:number;
public busDetails:buslist
constructor(
  private store:Store
){
  this.userDetails$ = this.store.select(UserInfo.getUserInfo);
  this.userDetails={} as user;
  this.seatNumber=[];
  this.netFare=0;
  this.busDetails={} as buslist;
}
  ngOnInit(): void {
    this.userDetails$.pipe(
      tap((res)=>{
        this.userDetails=res;
        console.log(this.userDetails)
      })
      ).subscribe()
      this.store.select(UserInfo.getSeatSummary).subscribe(
        {
          next:(res)=>{
            console.log(res);
            this.seatNumber=res
            // this.netFare=res.netfare;
            // this.busDetails=res.busdetails
          }
        }
      )
      this.store.select(UserInfo.getSelectedBus).subscribe(
        {
          next:(res)=>{
            console.log(res);
            // this.seatNumber=res
            // this.netFare=res.netfare;
            this.busDetails=res;
          }
        }
      )
      this.store.select((state:UserStateModel)=>{return state.netFare}).subscribe({
        next:(res)=>this.netFare=res
      })
  }
}
