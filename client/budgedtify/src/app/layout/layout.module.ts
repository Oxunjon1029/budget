import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'category',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
