import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from '../shared/services/spinner.service';
import { Accounts } from './accounts.interface';
import { Currencies } from './currencies.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountFrontService {
  private accounts: Subject<Accounts[]> = new BehaviorSubject<Accounts[]>([]);
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.UpdateAccountsList();
    console.log('accounts');
  }

  getAccounts(): Observable<Accounts[]> {
    return this.accounts.asObservable();
  }
  UpdateAccountsList(): void {
    this.http
      .get<Accounts[]>('http://localhost:3000/accounts')
      .subscribe((v: Accounts[]) => {
        this.accounts.next(v);
      });
  }
  controlSubject: Subject<boolean> = new Subject();
  createAccount(title: string, currency: string, description: string) {
    this.http
      .post<Accounts[]>('http://localhost:3000/accounts/add', {
        title,
        currency,
        description,
      })
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (res: Accounts[]) => {
          if (res !== null) {
            this.UpdateAccountsList();
            if (window.location.pathname === '/accountsMain') {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.spinnerService.hideSpinner();
              }, 2000);
            } else {
              this.spinnerService.showSpinner();
              setTimeout(() => {
                this.spinnerService.hideSpinner();
              }, 10000);
              this.router.navigateByUrl('/accountsMain');
            }
            console.log(res);
          }
        },
        (err) => {
          this.refReshToken(err);
        }
      );
  }
  getCurrencies(): Observable<Currencies[]> {
    return this.http.get<Currencies[]>('http://localhost:3000/currency');
  }
  getAllAccounts(): Observable<Accounts[]> {
    return this.http.get<Accounts[]>('http://localhost:3000/accounts');
  }
  getAccountById(id: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(`http://localhost:3000/accounts/${id}`);
  }

  editAccount(
    id: string,
    title: string,
    description: string,
    currency: string
  ) {
    this.http
      .post<Accounts[]>(`http://localhost:3000/accounts/edit/${id}`, {
        title: title,
        description: description,
        currency: currency,
      })
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Accounts[]) => {
          this.UpdateAccountsList();
          this.spinnerService.showSpinner();
          setTimeout(() => {
            this.spinnerService.hideSpinner();
          }, 2000);
        },
        (err) => {
          this.refReshToken(err);
        }
      );
  }
  deleteAccount(id: string) {
    this.http
      .delete<Accounts[]>(`http://localhost:3000/accounts/deleteAccount/${id}`)
      .subscribe(
        (res: Accounts[]) => {
          this.UpdateAccountsList();
        },
        (err) => {
          this.refReshToken(err);
        }
      );
  }

  async refReshToken(err: HttpErrorResponse) {
    if (err.status === 401) {
      localStorage.removeItem('idToken');
      localStorage.removeItem('id');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('categoryId');
      localStorage.removeItem("userId")
      await window.location.reload();
      await this.router.navigateByUrl('/login');
    }
  }
}
