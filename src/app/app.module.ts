import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BNavbarComponent } from './components/b-navbar/b-navbar.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { SeatGenerateComponent } from './components/seat-generate/seat-generate.component';
import { SeatsComponent } from './components/seat-generate/seats/seats.component';
import { SummaryComponent } from './components/seat-generate/summary/summary.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ReviewComponent } from './components/review/review.component';
import { BusTicketComponent } from './components/bus-ticket/bus-ticket.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { SeatsAvailableDirective } from './customDirectives/seats-available.directive'
import { UserInfo } from './ngxs/store/store.service';
import { NgxsModule } from '@ngxs/store';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavbarComponent,
    BNavbarComponent,
    BusListComponent,
    SeatGenerateComponent,
    SeatsComponent,
    SummaryComponent,
    UserInfoComponent,
    ReviewComponent,
    BusTicketComponent,
    HomeComponent,
    AlertComponent,
    SeatsAvailableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([UserInfo])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
