import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import {HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignUpComponent,
    JobOffersComponent,
    CompanyRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
