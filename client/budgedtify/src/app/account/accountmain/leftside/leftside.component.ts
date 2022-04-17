import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountFrontService } from '../../account-front.service';
import { Accounts } from '../../accounts.interface';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogmainComponent } from '../../dialogmain/dialogmain.component';

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.scss'],
})
export class LeftsideComponent implements OnInit {
  constructor(
    private accountService: AccountFrontService,
    public dialog: MatDialog
  ) {}
  responsedata: Accounts[] = [];
  controlSubject: Subject<boolean> = new Subject();
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data: Accounts[]) => {
      this.responsedata = data;
    });
    if (!this.responsedata.length) {
      this.accountService
        .getAllAccounts()
        .pipe(takeUntil(this.controlSubject))
        .subscribe((data: Accounts[]) => {
          this.responsedata = data;
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '450px',
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
  openDialogMain(id: string): void {
    this.accountService.getAccountById(id).subscribe(
      (data: Accounts[]) => {
        if (data !== null) {
          localStorage.setItem('id', data[0]._id);
          const dialogRef = this.dialog.open(DialogmainComponent, {
            width: '400px',
            height: '450px',
            data: data,
          });
          dialogRef.afterClosed().subscribe(() => {});
        }
      },
      (err: Accounts[]) => {}
    );
  }
}
