import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss'],
})
export class DeletedialogComponent {
  constructor(
    private accountService: AccountFrontService,
    private dialogRef: MatDialogRef<DeletedialogComponent>,
    public id: string
  ) {}
  controlSubject: Subject<boolean> = new Subject();
  onNoClick(): void {
    this.dialogRef.close();
  }
  account: Accounts[] = [];
  onDeleteAccount(id: string) {
    this.accountService
      .deleteAccount(id)
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Accounts[]) => {
          this.id = data[0]._id;
          console.log(data[0]._id);
        },
        (err) => {
          console.log(err, +'id :');
        }
      );
    this.dialogRef.close();
  }
}
