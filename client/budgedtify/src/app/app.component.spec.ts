import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { SpinnerService } from './shared/services/spinner.service';

describe('AppComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'logout',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('isLoggedIn', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    const result = component.isLoggedIn;
    expect(result).toBe(true);
  });

  it('logout', () => {
    spyOn(router, 'navigateByUrl');
    component.logout();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/login');
  });
});