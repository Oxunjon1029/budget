import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountFrontService {
  constructor(private http: HttpClient) {}

  createAccount(title: string, currency: string, description: string) {
    return this.http.post('http://localhost:3000/accounts/add', {
      title,
      currency,
      description,
    });
  }
  getCurrencies(){
    return this.http.get('http://localhost:3000/currency')
  }
  getAllAccounts(){
    return this.http.get('http://localhost:3000/accounts');
  }
}
