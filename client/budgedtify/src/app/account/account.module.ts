import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountFrontComponent } from './account-front/account-front.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { AccountmainComponent } from './accountmain/accountmain.component';
import { DialogmainComponent } from './dialogmain/dialogmain.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeftsideComponent } from './accountmain/leftside/leftside.component';
import { CenterComponent } from './accountmain/center/center.component';
import { RightsideComponent } from './accountmain/rightside/rightside.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { DialogeditComponent } from './dialogedit/dialogedit.component';
const routes: Routes = [
  {
    path: 'accounts',
    component: AccountFrontComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accountsMain',
    component: AccountmainComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AccountFrontComponent,
    DialogComponent,
    DialogeditComponent,
    AccountmainComponent,
    DialogmainComponent,
    LeftsideComponent,
    CenterComponent,
    RightsideComponent,
    DeletedialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DialogComponent, DialogmainComponent, DialogeditComponent],
})
export class AccountModule {}
