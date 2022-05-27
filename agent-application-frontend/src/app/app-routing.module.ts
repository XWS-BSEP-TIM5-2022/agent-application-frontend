import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TestComponent } from './components/test/test.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'feed',
    component: UserFeedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
