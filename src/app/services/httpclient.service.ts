import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Env } from '../environment/env';
import { Observable, of, timeout } from 'rxjs';
import {buslist, searchForm, user} from '../models/searchform.model'

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  constructor(
    private http:HttpClient
  ) {

   }
   public post(form:user):Observable<user>{
    return this.http.post<user>(Env.userapi,form)
   }
   public get(form:searchForm):Observable<buslist[]>{
    const parms=new HttpParams()
    .set("source",form.pickup)
    .set("destination",form.drop)
    .set("date",form.date);
    console.log(parms);
    return this.http.get<buslist[]>(Env.buslistapi,{params:parms})
   }
}
