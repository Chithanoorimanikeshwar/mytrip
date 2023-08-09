import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { searchForm } from 'src/app/models/searchform.model';
import { GetBusDetails } from 'src/app/ngxs/action/action.service';
import { UserInfo, UserStateModel } from 'src/app/ngxs/store/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public userform:FormGroup;
  public loading:Boolean;
  public searchform:searchForm;

  constructor(
    private fb:FormBuilder,
    private route:Router,
    private alert$:AlertService,
    private navbar:NavbarService,
    private store:Store,
    private authService:AuthService
  ){
    this.userform={} as FormGroup;
    this.loading=false;
    this.navbar.post("search");
    this.searchform={} as searchForm;
  }

  ngOnInit(): void {
      this.navbar.post("search");
      this.alert$.post("");
      this.store.select(UserInfo.getSearchData).subscribe({next:(res)=>this.searchform.pickup=res.pickup})
      this.store.select(UserInfo.getSearchData).subscribe({next:(res)=>this.searchform.drop=res.drop});
      this.store.select(UserInfo.getSearchData).subscribe({next:(res)=>this.searchform.date=res.date});
    this.userform=this.fb.group({
      pickup:[this.searchform.pickup
        ,[Validators.required]],
      drop:[this.searchform.drop
      ,[Validators.required]],
      date:[this.searchform.date
      ,[Validators.required]]
    })
  }
  ngOnDestroy(){
    this.loading=false;
  }
  public formSubmit():void{
    this.loading=true;
    
    console.log('searchform',this.userform.value);
    this.store.dispatch(new GetBusDetails(this.userform.value));
    this.store.select(UserInfo.getAvailableBuses).pipe(
    
      tap((res)=>{this.authService.next(res.status)})
    ).subscribe({
      next:(res)=>{
        if(res.status){
          console.log('iam true',res.status);
          this.loading=false;
          this.alert$.post("");
        }
      else{
      this.authService.next(res.status)
      this.alert$.post('unable to process your request');
    this.loading=false;
      }
      }
    })
    this.route.navigateByUrl('makemytrip/availablebuses');
}
}
