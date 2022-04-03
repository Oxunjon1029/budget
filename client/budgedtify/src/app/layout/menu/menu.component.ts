import { Component, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item/menu-item.module';
import { MENU_CONFIG } from './menu.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menu: IMenuItem[] = MENU_CONFIG;
  constructor() {}

  trackBy(index: number, item: IMenuItem): string | number {
    return item.id;
  }
}
