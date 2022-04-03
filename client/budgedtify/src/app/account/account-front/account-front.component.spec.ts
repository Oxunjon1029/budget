import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFrontComponent } from './account-front.component';

describe('AccountFrontComponent', () => {
  let component: AccountFrontComponent;
  let fixture: ComponentFixture<AccountFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
