import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from './accounts.interface';
import { Currencies } from './currencies.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountFrontService {
  constructor(private http: HttpClient) {}

  createAccount(
    title: string,
    currency: string,
    description: string
  ): Observable<Accounts[]> {
    return this.http.post<Accounts[]>('http://localhost:3000/accounts/add', {
      title,
      currency,
      description,
    });
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
  ): Observable<Accounts[]> {
    return this.http.post<Accounts[]>(
      `http://localhost:3000/accounts/edit/${id}`,
      {
        title: title,
        description: description,
        currency: currency,
      }
    );
  }
  deleteAccount(id: string): Observable<Accounts[]> {
    return this.http.delete<Accounts[]>(
      `http://localhost:3000/accounts/deleteAccount/${id}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
  }
}
