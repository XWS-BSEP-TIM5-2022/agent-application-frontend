import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {
    path: 'test',
    component: TestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
