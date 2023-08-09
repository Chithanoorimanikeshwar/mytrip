import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
export type status={
    id:string,
    selected:boolean
}
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class SeatsComponent implements OnInit{
 
  @Input() seatsPosition:string[] ;
  @Input() noOfSeats:number;
  @Input('activate') activate:boolean
  @Output('select') childEvent=new EventEmitter<status>()
  public updateClass=true;
  // @Input() busname:string;
 
 
  get rows(){
   
      return Array.from(Array(this.noOfSeats/4).keys());

  }
  get columns(){
    return Array.from(Array(this.noOfSeats/4).keys());
  }
  constructor(){
    this.noOfSeats=0;
    // this.busname="";
    this.activate=false;
    this.seatsPosition=[];
   
  }
  ngOnInit(): void {
  //  console.log(this.seatsPosition);
  }
  ngOnChange(){
    // console.log(this.busname);
  }
  public selectedSeats(event:any){

    // event.stopPropagation();
    const selectedSeat=event.target.closest('svg');
    // this.selectedSeats$= of(event.target.closest('svg').id);
    
    if(this.seatsPosition.includes(selectedSeat.id)){
      let modifySeat=selectedSeat.lastChild?.lastChild as HTMLElement;
      // console.log(modifySeat,selectedSeat.id)
      if(!(modifySeat.getAttribute('aria-selected')=="true")){
            modifySeat.style.stroke="#2610dd";
            modifySeat.setAttribute('aria-selected','true');

             this.childEvent.emit({
              id:selectedSeat.id,
              selected:true
             });
        
            return;
      }
      else{
      modifySeat.style.stroke="#f7f6ff";
      modifySeat.setAttribute('aria-selected','false');

      this.childEvent.emit({
        id:selectedSeat.id,
        selected:false
       });
      }
     
    }
    // this.childEvent.emit(this.selectedSeats$);
   
  }
  
  public seatBooked(id:any){
    const seat:string=id.getAttribute('id');
    if(!(this.seatsPosition.includes(seat))){
      return true;
  }
  return false;
}
}
