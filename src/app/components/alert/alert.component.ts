import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  public error:string;
  constructor(
    private alert$:AlertService
  ){
    this.error="";
  }
  ngOnInit(): void {
    this.alert$.get().subscribe(
      (data)=>{
        this.error=data;
      }
    )
  }


}
