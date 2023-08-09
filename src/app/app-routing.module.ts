import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { SeatGenerateComponent } from './components/seat-generate/seat-generate.component';
// import { ReviewComponent } from './components/review/review.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BusTicketComponent } from './components/bus-ticket/bus-ticket.component';
import { AuthGuard } from './gaurds/authgaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'makemytrip', pathMatch: 'full' },
  {
    path: 'makemytrip',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'availablebuses', component: BusListComponent,canActivate:[AuthGuard] },
      { path: 'seats', component: SeatGenerateComponent,canActivate:[AuthGuard]  },
    ]
  },
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'busticket', component: BusTicketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
