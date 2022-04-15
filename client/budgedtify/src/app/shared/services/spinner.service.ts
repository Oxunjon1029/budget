import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isSpinnerVisible$: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  getIsSpinnerVisible$():Observable<boolean> {
    return this.isSpinnerVisible$
      .asObservable()
      .pipe(observeOn(asyncScheduler));
  }

  showSpinner() {
    console.log('showSpinner');
    this.isSpinnerVisible$.next(true);
  }

  hideSpinner() {
    this.isSpinnerVisible$.next(false);
  }
}
