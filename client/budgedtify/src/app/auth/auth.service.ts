import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    // const params = new HttpParams()
    //   .set('email', email)
    //   .set('password', password);
    // console.log(params);

    return this.http
      .post(
        'http://localhost:3000/login',
        { email,password }
      )
      .pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.Authorization);
    localStorage.setItem('expiresIn', String(expiresIn));
  }
}
