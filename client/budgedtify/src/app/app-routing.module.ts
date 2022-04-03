import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFrontComponent } from './account/account-front/account-front.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/accounts' },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
