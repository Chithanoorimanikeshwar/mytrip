export type searchForm={
   drop:string,
   pickup:string,
   date:string

}
export type buslist={
    id:number,
    bus:string,
    dept_time:string,
    coach:string,
    seatsAvailable:number,
    seatsPosition:[]
    Fare:number
}
export type user={
    id?:number,
    username:string;
    email:string;
    mobileNo:string
}

