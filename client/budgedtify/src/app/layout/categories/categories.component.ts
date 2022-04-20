import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CategorydialogComponent } from '../categorydialog/categorydialog.component';
import { CategoryService } from '../services/category.service';
import { Categories } from './categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoryservice: CategoryService,
    private dialog: MatDialog
  ) {}

  isEditable: boolean = false;

  categories: Categories[] = [];
  editCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });
  controlSubject: Subject<boolean> = new Subject();
  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe((data: Categories[]) => {
      this.categories = data;
      if (!data.length) {
        this.categoryservice
          .getAllCategories()
          .pipe(takeUntil(this.controlSubject))
          .subscribe((data: Categories[]) => {
            this.categories = data;
            console.log(this.categories);
          });
        const category = data.filter(
          (item) => item._id === localStorage.getItem('categoryId')
        );
        
      }
    });
  }
  openCreateCategoryDialog(): void {
    
    const dialogRef = this.dialog.open(CategorydialogComponent, {
      width: '400px',
      height: '450px',
    });
    dialogRef.afterClosed();
  }
  editCategory(id: string) {
    this.categoryservice.editCategory(id, this.editCategoryForm.value);
  }
  makeItEditable(id: string): void {
    this.categoryservice
      .getCategoriesById(id)
      .pipe(takeUntil(this.controlSubject))
      .subscribe((data: Categories[]) => {
        if (data.length) {
          const category = data.filter((item) => item._id === id);
          if (category) {
            this.isEditable = true;
          }
        }
      });
  }

  deleteCategory(id: string) {
    this.categoryservice.deleteCategory(id);
  }
  filterByIncomeType(type: string): Categories[] {
    return this.categories.filter((item) => item.Type === type);
  }
}
