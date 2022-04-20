import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '../../app/app.config';

describe('Auth service with TestBed', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      Authorization: 'idToken',
      expiresIn: 10000,
    };
    service.login('email', 'psw').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${APP_CONFIG.api.url}/login`,
    });
    req.flush(expectedResult);
  });

  it('setSession have not to call on error', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    service.login('email', 'psw').subscribe({
      error: () => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${APP_CONFIG.api.url}/login`,
    });
    req.error(new ProgressEvent('401'));
  });
});
