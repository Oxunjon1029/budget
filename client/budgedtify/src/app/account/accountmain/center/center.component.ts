import { Component } from '@angular/core';
import { Transactions } from './center.transactions';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent {
  constructor() {}

  transactions: Transactions[] = [
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: "04.12.2022",
      amount: '-650.00$',
    },
  ];
}
