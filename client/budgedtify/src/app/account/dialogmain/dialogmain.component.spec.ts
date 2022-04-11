import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmainComponent } from './dialogmain.component';

describe('DialogmainComponent', () => {
  let component: DialogmainComponent;
  let fixture: ComponentFixture<DialogmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
