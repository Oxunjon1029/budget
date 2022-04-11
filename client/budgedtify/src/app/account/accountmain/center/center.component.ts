import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {
  constructor() {}

  transactions: Array<any> = [
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
    {
      description: 'Flat rent for March',
      createdAt: Date.now(),
      amount: '-650.00$',
    },
  ];
  ngOnInit(): void {}
}
