import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.scss'],
})
export class CategorydialogComponent implements OnInit {
  constructor(
    private categoryservice: CategoryService,
    private dialogRef: MatDialogRef<CategorydialogComponent>
  ) {}
  createCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    Type: new FormControl('income', [Validators.required]),
  });
  controlSubject: Subject<boolean> = new Subject();
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  createCategory(): void {
    const { title, Type } = this.createCategoryForm.value;
    this.categoryservice.createCategory(title, Type);
    this.dialogRef.close();
  }
}
