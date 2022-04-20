import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../auth/auth.guard';
import { CategorydialogComponent } from './categorydialog/categorydialog.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    CategorydialogComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent],
  entryComponents:[CategorydialogComponent]
})
export class LayoutModule {}
