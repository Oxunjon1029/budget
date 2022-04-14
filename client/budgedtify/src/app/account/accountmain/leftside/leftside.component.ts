import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountFrontService } from '../../account-front.service';
import { Accounts } from '../../accounts.interface';
import { DialogComponent } from '../../dialog/dialog.component';
import { DialogmainComponent } from '../../dialogmain/dialogmain.component';
class AllAccounts {
  constructor(
    public title: string,
    public description: string,
    public createdAt: string
  ) {}
}
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

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(
      (data: Accounts[]) => {
        if (data !== null) {
          this.responsedata = data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
          console.log(data, +' ' + ' ' + data);

          const dialogRef = this.dialog.open(DialogmainComponent, {
            width: '400px',
            height: '450px',
            data: data,
          });
          dialogRef.afterClosed().subscribe(() => {});
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
