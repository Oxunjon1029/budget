import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';
const ID = new InjectionToken<string>('id', {
  providedIn: 'root',
  factory: () => '',
});
@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss'],
})
export class DeletedialogComponent implements OnInit {
  constructor(
    private accountService: AccountFrontService,
    private dialogRef: MatDialogRef<DeletedialogComponent>,
    private spinnerService: SpinnerService,
    @Inject(ID) public id: string
  ) {}
  controlSubject: Subject<boolean> = new Subject();
  onNoClick(): void {
    this.dialogRef.close();
  }
  account: Accounts[] = [];
  ngOnInit() {
    this.accountService
      .getAllAccounts()
      .pipe(takeUntil(this.controlSubject))
      .subscribe((data: Accounts[]) => {
        const account = data.filter(
          (x) => x._id === localStorage.getItem('id')
        );
        this.id = account[0]._id;
      });
  }
  onDeleteAccount(id: string) {
    this.accountService.deleteAccount(id);
    this.spinnerService.showSpinner();
    setTimeout(() => {
      this.spinnerService.hideSpinner();
    }, 2000);
    this.dialogRef.close();
  }
}
