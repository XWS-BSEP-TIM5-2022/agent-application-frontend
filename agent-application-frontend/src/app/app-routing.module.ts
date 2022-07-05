import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RoleGuardService } from './services/role-guard.service';
import { RequestsComponent } from './components/requests/requests.component';
import { TestComponent } from './components/test/test.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'job-offers',
    component: JobOffersComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_COMPANY_OWNER'] 
    }
  },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ROLE_ADMIN'] 
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
      expectedRole: ['ROLE_USER', 'ROLE_ADMIN']
    }
  }, 
  {
    path: 'test',
    component: TestComponent, 
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_COMPANY_OWNER'] 
    }
  },
  {
    path: 'company/:id',
    component: CompanyProfileComponent,
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_COMPANY_OWNER'] 
    }
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
