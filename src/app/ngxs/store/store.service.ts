import { Action, Selector, State, StateContext } from "@ngxs/store";
import {  GetBusDetails, PostUserInfo, SeatsSummary, SetSelectedBus} from "../action/action.service";
import { HttpclientService } from "src/app/services/httpclient.service";
import { Observable, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { buslist } from "src/app/models/searchform.model";
import { seatSummary } from "src/app/components/seat-generate/summary/summary.component";
export interface UserStateModel{
    id?:number,
    username:string,
    email:string,
    mobileNo:string,
    pickup:string,
    drop:string,
    date:string,
    availablebuses:buslist[],
    selectedBus:buslist,
    seatSummary:seatSummary[],
    netFare:number,
    busliststatus:boolean
}
@Injectable()
@State<UserStateModel>({
    name:'user',
    defaults:{
        id:0,
        username:"",
        email:"",
        pickup:"",
        drop:"",
        date:"",
        availablebuses:[],
        selectedBus:{} as buslist,
        seatSummary:[],
        mobileNo:"",
        netFare:0,
        busliststatus:false
    }
})
export class UserInfo{
    constructor(
        private httpClient:HttpclientService,
    ){

    }
    @Action(PostUserInfo)
    postUserInfo({getState,setState}:StateContext<UserStateModel>,{userform}:PostUserInfo){
         this.httpClient.post(userform).pipe(
            tap((res)=>{
                const state=getState();
                setState({
                    ...state,
                    id:res.id,
                    username:res.username,
                    email:res.email,
                    mobileNo:res.mobileNo
                })
            })
        ).subscribe({
            error(err) {
                console.log(err);
            },
        })
    }
    @Action(GetBusDetails)
    getBusDetails({setState,getState}:StateContext<UserStateModel>,{searchform}:GetBusDetails){
       this.httpClient.get(searchform).pipe(
            tap((res)=>{
                // console.log('store,searchform',searchform);
                // console.log('store,buslist',res);
                let state=getState();
                setState({
                    ...state,
                    pickup:searchform.pickup,
                    drop:searchform.drop,
                    date:searchform.date,   
                    availablebuses:res,
                    busliststatus:true

                })
            })
        ).subscribe({

            error:(err)=>{
                console.log(err)
                let state=getState();
                setState({
                    ...state,
                    busliststatus:false

                })
            }
        })
    }
    @Action(SetSelectedBus)
    setSelectedBus({getState,setState}:StateContext<UserStateModel>,{selectedBus}:SetSelectedBus){
        let state=getState();
        setState({
            ...state,
            selectedBus:selectedBus
        })
    }
    @Action(SeatsSummary)
    seatsSummary({getState,setState}:StateContext<UserStateModel>,{summary}:SeatsSummary){
        console.log('store',summary);
        let state=getState();
        setState({
            ...state,
            seatSummary:summary
        })
        return
    }




    @Selector()
    static getUserInfo(state: UserStateModel) {
      return {
        id:state.id,
        username:state.username,
        email:state.email,
        mobileNo:state.mobileNo
      }
      
    }
    @Selector()
    static getAvailableBuses(state: UserStateModel){
        return {
            availabeBus:state.availablebuses,
            status:state.busliststatus
        }
    }
    @Selector()
    static getSelectedBus(state:UserStateModel){
        return state.selectedBus;
    }
    @Selector()
    static getSeatSummary(state:UserStateModel){
        return state.seatSummary;
    }
    @Selector()
    static getSearchData(state:UserStateModel){
        return {
            pickup:state.pickup,
            drop:state.drop,
            date:state.date
        }
    }
}