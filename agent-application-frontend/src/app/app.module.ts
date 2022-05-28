import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDividerModule} from '@angular/material/divider';
import { MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/role-guard.service';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { RouterModule } from '@angular/router';
import { RequestsComponent } from './components/requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignUpComponent,
    JobOffersComponent,
    CompanyRegistrationComponent,
    UserFeedComponent,
    ActivateAccountComponent,
    AccountRecoveryComponent,
    AccountSettingsComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
      }, 
      AuthGuardService,
      JwtHelperService,
      RoleGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
