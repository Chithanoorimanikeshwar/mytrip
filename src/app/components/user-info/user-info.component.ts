import { Component, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { user} from 'src/app/models/searchform.model';
import { PostUserInfo } from 'src/app/ngxs/action/action.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpclientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnDestroy{
  constructor(
    private httpClient:HttpclientService,
    private store:Store,
    private alert:AlertService,
    private router:Router
  ){

  }
public userFormSubmitted(data:user){
  // this.httpClient.post(data).subscribe({
  //   next:(res)=>{
  //     console.log(res);
  //   },
  //   error:(err)=>{
  //     console.log(err);
  //   }
  // })
  console.log('userform',typeof(data.mobileNo));
  this.alert.post('Submitting Data...')
  this.store.dispatch(new PostUserInfo(data));
  this.alert.post('Form Submitted Successfully');
  this.router.navigateByUrl("/busticket");

}
ngOnDestroy(){
  this.alert.post('');
  
}
}
