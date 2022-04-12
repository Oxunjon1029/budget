import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AccountFrontService } from '../../account-front.service';
import { DialogComponent } from '../../dialog/dialog.component';
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
  responsedata: any;

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(
      (data) => {
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
    dialogRef.afterClosed().subscribe((data) => {
      console.log('dialog closed');
    });
  }
}
