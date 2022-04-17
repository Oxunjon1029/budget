import { Component } from '@angular/core';
import { Categories } from './categories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor() {}
  isEditable: boolean = false;

  categories: Categories[] = [
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
    {
      title: 'Food',
    },
  ];

  makeItEditable(): void {
    this.isEditable = true;
  }
}
