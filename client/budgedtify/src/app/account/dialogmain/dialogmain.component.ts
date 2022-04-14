import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AccountFrontService } from '../account-front.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogeditComponent } from '../dialogedit/dialogedit.component';

@Component({
  selector: 'app-dialogmain',
  templateUrl: './dialogmain.component.html',
  styleUrls: ['./dialogmain.component.scss'],
})
export class DialogmainComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogmainComponent>,
    public dialog: MatDialog,
    private accountService: AccountFrontService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(id: string): void {
    this.accountService.getAccountById(id).subscribe((data) => {
      const dialogRefNext = this.dialog.open(DialogeditComponent, {
        width: '400px',
        height: '450px',
      });
      console.log(data);
      dialogRefNext.afterClosed();
    });
  }
  openDeleteDialog() {
    const dialogRefNextDelete = this.dialog.open(DeletedialogComponent, {
      width: '400px',
      height: '250px',
    });
    dialogRefNextDelete.afterClosed();
  }
}
