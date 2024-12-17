import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInfo } from 'src/app/ngxs/store/store.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
public DandT:string | null;
public couch:string;
public seatNO:any[];
constructor(
  private store:Store
){
  this.DandT="";
  this.couch="";
  this.seatNO=[];
}
  ngOnInit(): void {
    this.store.select(UserInfo.getSearchData).subscribe({
      next:(res)=>{this.DandT=res.date}
    })
    // // if(sessionStorage.getItem('date')){
    //   this.DandT=sessionStorage.getItem('date');
    // }
    

    this.store.select(UserInfo.getSeatSummary).subscribe({
      next:(res)=>{
        console.log(res);
        this.seatNO=res;
        try{
          this.couch=res[0].class?res[0].class:"";
        }
        catch{
          console.log('exception handled');
          this.couch="";
        }
      }
    })
    // if(sessionStorage.getItem('seatsSummary')){ 

    //   let data=JSON.parse( sessionStorage.getItem('seatsSummary') || "");
    //   if((data) instanceof Array){
    //       this.seatNO=data;
    //       this.couch=data[0].class;
    //   }
    // }
    
  }


}
