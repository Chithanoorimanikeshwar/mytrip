import { Component, DoCheck, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-b-navbar',
  templateUrl: './b-navbar.component.html',
  styleUrls: ['./b-navbar.component.css']
})
export class BNavbarComponent  {
  public routes:string[];
  constructor(
    private routeService:NavbarService
  ){
    this.routes=[]
  }
  // ngOnInit(){
  //   this.routes=this.routeService.getList();
  //     console.log(this.routes)
  // }
  ngDoCheck(): void {
    this.routes=this.routeService.updateList();
  }


}




