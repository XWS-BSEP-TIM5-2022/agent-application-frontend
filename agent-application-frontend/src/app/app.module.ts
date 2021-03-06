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
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/role-guard.service';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { DialogLeaveComment } from './components/company-profile/dialog-comments/dialog-data' 
import { DialogEnterSalary } from './components/company-profile/dialog-salary/dialog-data' 
import { DialogEnterInterview } from './components/company-profile/dialog-interviews/dialog-data' 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { RequestsComponent } from './components/requests/requests.component';
import { NewJobOfferComponent } from './components/new-job-offer/new-job-offer.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { MatChipsModule } from '@angular/material/chips';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { EditCompanyInfoComponent } from './components/edit-company-info/edit-company-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignUpComponent,
    JobOffersComponent,
    CompanyRegistrationComponent,
    ActivateAccountComponent,
    AccountRecoveryComponent,
    AccountSettingsComponent,
    DialogLeaveComment,
    DialogEnterSalary, 
    DialogEnterInterview,
    RequestsComponent,
    NewJobOfferComponent,
    CompaniesComponent,
    CompanyProfileComponent,
    EditCompanyInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    RouterModule,
    MatChipsModule,
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
