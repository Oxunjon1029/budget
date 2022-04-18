import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SnackbarserviceService } from 'src/app/app/snackbarservice.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Users } from 'src/app/auth/users.interface';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { AccountFrontService } from '../account-front.service';
import { Accounts } from '../accounts.interface';
import { Currencies } from '../currencies.interface';
const ID = new InjectionToken<string>('id', {
  providedIn: 'root',
  factory: () => '',
});
@Component({
  selector: 'app-dialogedit',
  templateUrl: './dialogedit.component.html',
  styleUrls: ['./dialogedit.component.scss'],
})
export class DialogeditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DialogeditComponent>,
    private accountService: AccountFrontService,
    @Inject(ID) public id: string,
  ) {}
  EditAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      Validators.pattern('^[a-zA-Z,.!?\\s-]*$'),
    ]),
    currency: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
  currencies: Currencies[] = [];
  controlSubject: Subject<boolean> = new Subject();

  ngOnInit(): void {
    console.log(
      this.accountService.getCurrencies().subscribe((data: Currencies[]) => {
        this.currencies = data;
      }),
      this.accountService
        .getAllAccounts()
        .pipe(takeUntil(this.controlSubject))
        .subscribe((data: Accounts[]) => {
          const account = data.filter(
            (item: any) => item._id === localStorage.getItem('id')
          );
          this.id = account[0]._id;
          console.log(this.id);
          console.log(account);

          this.EditAccountForm = new FormGroup({
            title: new FormControl(account[0]['title'], [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern('^[a-zA-Z,.!?\\s-]*$'),
            ]),
            currency: new FormControl(
              account[0]['currency'],
              Validators.required
            ),
            description: new FormControl(account[0]['description']),
          });
        })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get isValidControllers() {
    return this.EditAccountForm.controls;
  }

  editAccounts(id: string) {
    const { title, currency, description } = this.EditAccountForm.value;
    this.accountService.editAccount(id, title, description, currency);
    this.dialogRef.close();
  }
}
