import { Directive, ElementRef, Input } from '@angular/core';
type customtype={
    id:string,
    classTrue:string,
    classFalse:string
}
@Directive({
  selector: '[areSeatsAvailable]'
})

export class SeatsAvailableDirective {
 
  @Input('areSeatsAvailable') data:customtype; 
  constructor(
    private element:ElementRef
  ) { 
      this.data={} as customtype;
      this.worker();
  }
  public worker(){
    const id=this.data.id;
    const classTrue=this.data.classTrue;
    const classFalse=this.data.classFalse;

    console.log(id);
  //   if(seats && parseInt(seats)>0){
  //     this.element.nativeElement.addAttribute('class',classTrue);
  //   }
  //   else{
  //     this.element.nativeElement.addAttribute('class',classFalse);
  //   }
  // }

}
}
