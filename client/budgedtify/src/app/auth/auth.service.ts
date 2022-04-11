import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
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
    localStorage.removeItem("userId");
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      return Date.now() < Number(expiresIn);
    }
    return false;
  }

  getUsers(){
     return this.http.get('http://localhost:3000/login')
  }
  private setSession(res: any) {
    const expiresIn = Date.now() + Number(res.expiresIn);
    localStorage.setItem('idToken', res.Authorization);
    localStorage.setItem('expiresIn', String(expiresIn));
    localStorage.setItem('userId',res.userId)
  }
}
