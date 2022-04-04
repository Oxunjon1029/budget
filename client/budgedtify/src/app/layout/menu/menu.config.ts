import { IMenuItem } from './menu-item/menu-item.module';

export const MENU_CONFIG: IMenuItem[] = [
  {
    id: 'todo',
    title: 'Account',
    route: '/accounts',
    icon: 'listalt',
  },
  {
    id: 'logout',
    title: 'Logout',
    route: '/logout',
    icon: 'logout',
  },
];
