import { Component, Inject, InjectionToken } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogeditComponent } from '../dialogedit/dialogedit.component';
const ID = new InjectionToken<string>('id', {
  providedIn: 'root',
  factory: () => '',
});
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
    private accountService: AccountFrontService,
    @Inject(ID) public id: string
  ) {}

  controlSubject: Subject<boolean> = new Subject();
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialog(id: string): void {
    this.accountService.getAccountById(id).subscribe((data: Accounts[]) => {
      if (data !== null) {
        const account = data.filter(
          (item: any) => item._id === localStorage.getItem('id')
        );
        this.id = account[0]._id;
        console.log(account[0]._id);
      }
      const dialogRefNext = this.dialog.open(DialogeditComponent, {
        width: '400px',
        height: '450px',
      });
      dialogRefNext.afterClosed();
      this.onNoClick();
    });
  }
  openDeleteDialog(id: string) {
    this.accountService
      .getAccountById(id)
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Accounts[]) => {
          if (data !== null) {
            const account = data.filter(
              (item: any) => item._id === localStorage.getItem('id')
            );
            this.id = account[0]._id;
            console.log(account[0]._id);
          }
          const dialogRefDelete = this.dialog.open(DeletedialogComponent, {
            width: '400px',
            height: '250px',
          });
          dialogRefDelete.afterClosed();
          this.onNoClick();
        },
        (err: Accounts[]) => {
          this.accountService.refReshToken(err);
          console.log(err);
          
        }
      );
  }
}
