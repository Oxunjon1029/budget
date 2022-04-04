import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFrontComponent } from './account-front/account-front.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'accounts',
    component: AccountFrontComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [AccountFrontComponent],
  imports: [CommonModule,RouterModule.forChild(routes)],
})
export class AccountModule {}
