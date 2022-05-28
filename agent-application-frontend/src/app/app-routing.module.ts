import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'job-offers',
    component: JobOffersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
