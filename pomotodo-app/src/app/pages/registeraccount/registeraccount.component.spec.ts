import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteraccountComponent } from './registeraccount.component';

describe('RegisteraccountComponent', () => {
  let component: RegisteraccountComponent;
  let fixture: ComponentFixture<RegisteraccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteraccountComponent]
    });
    fixture = TestBed.createComponent(RegisteraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
