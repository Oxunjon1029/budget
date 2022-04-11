import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-account-front',
  templateUrl: './account-front.component.html',
  styleUrls: ['./account-front.component.scss'],
})
export class AccountFrontComponent {
  constructor(public dialog: MatDialog) {}
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height:'450px'
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log('dialog closed');
    });
  }
  
}
