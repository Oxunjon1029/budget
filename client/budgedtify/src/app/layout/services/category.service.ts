import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Categories } from '../categories/categories.interface';
import { AccountFrontService } from 'src/app/account/account-front.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Subject<Categories[]> = new BehaviorSubject<Categories[]>(
    []
  );
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private accountService: AccountFrontService
  ) {
    this.UpdateCategoryList();
  }
  controlSubject: Subject<boolean> = new Subject();
  getCategories(): Observable<Categories[]> {
    return this.categories.asObservable();
  }

  UpdateCategoryList(): void {
    this.http
      .get<Categories[]>('http://localhost:3000/categories')
      .subscribe((data: Categories[]) => {
        this.categories.next(data);
      });
  }
  createCategory(title: string, Type: string): void {
    this.http
      .post<Categories[]>('http://localhost:3000/categories/add', {
        title,
        Type,
      })
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Categories[]) => {
          console.log(data);

          this.UpdateCategoryList();
          this.spinnerService.showSpinner();
          if (data !== null) {
            setTimeout(() => {
              this.spinnerService.hideSpinner();
            }, 1000);
          }
        },
        (err: HttpErrorResponse) => {
          this.accountService.refReshToken(err);
        }
      );
  }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>('http://localhost:3000/categories');
  }
  getCategoriesById(id: string): Observable<Categories[]> {
    return this.http.get<Categories[]>(
      `http://localhost:3000/categories/${id}`
    );
  }
  editCategory(id: string, title: string): void {
    this.http
      .post<Categories[]>(`http://localhost:3000/categories/edit/${id}`, {
        title: title,
      })
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Categories[]) => {
          this.UpdateCategoryList();
          this.spinnerService.showSpinner();
          setTimeout(() => {
            this.spinnerService.hideSpinner();
          }, 2000);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 409) {
          }
          this.accountService.refReshToken(err);
        }
      );
  }
  deleteCategory(id: string): void {
    this.http
      .delete<Categories[]>(`http://localhost:3000/categories/delete/${id}`)
      .pipe(takeUntil(this.controlSubject))
      .subscribe(
        (data: Categories[]) => {
          this.UpdateCategoryList();
          this.spinnerService.showSpinner();
          setTimeout(() => {
            this.spinnerService.hideSpinner();
          }, 1000);
        },
        (err) => {
          this.accountService.refReshToken(err);
        }
      );
  }
}
