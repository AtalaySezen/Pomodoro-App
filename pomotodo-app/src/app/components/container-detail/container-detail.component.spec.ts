import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDetailComponent } from './container-detail.component';

describe('ContainerDetailComponent', () => {
  let component: ContainerDetailComponent;
  let fixture: ComponentFixture<ContainerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerDetailComponent]
    });
    fixture = TestBed.createComponent(ContainerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
