import { seatSummary } from "src/app/components/seat-generate/summary/summary.component";
import { buslist, searchForm, user } from "src/app/models/searchform.model";

export class PostUserInfo{
    static readonly type="[user-info] post"
    constructor(public userform:user){
        
    }
}
export class GetUserInfo{
    static readonly type="[store] get"
}
export class GetBusDetails{
    static readonly type="[search-form] get"
    constructor(public searchform:searchForm){

    }
}
export class SetSelectedBus{
    static readonly type="[buslist] set"
    constructor(public selectedBus:buslist){

    }
}
export class SeatsSummary{
    static readonly type='[summary] set'
    constructor(public summary:seatSummary[]){
        
    }
}