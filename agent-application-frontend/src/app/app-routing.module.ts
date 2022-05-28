import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TestComponent } from './components/test/test.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'job-offers',
    component: JobOffersComponent,
  },
  {
    path: 'feed',
    component: UserFeedComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ROLE_USER', 'ROLE_ADMIN'] 
    }
  },
  {
    path: 'activate-account/:token',
    component: ActivateAccountComponent,
  },
  {
    path: 'account-recovery',
    component: AccountRecoveryComponent,
  },
  {
    path: 'account-setting',
    component: AccountSettingsComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: 'ROLE_USER' //['User', 'Admin']
    }
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
