import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './interceptor/token-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/role-guard.service';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogLeaveComment } from './components/test/dialog-comments/dialog-data' 
import { DialogEnterSalary } from './components/test/dialog-salary/dialog-data' 
import { DialogEnterInterview } from './components/test/dialog-interviews/dialog-data' 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignUpComponent,
    UserFeedComponent,
    ActivateAccountComponent,
    AccountRecoveryComponent,
    AccountSettingsComponent,
    DialogLeaveComment,
    DialogEnterSalary, 
    DialogEnterInterview,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonToggleModule,
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
