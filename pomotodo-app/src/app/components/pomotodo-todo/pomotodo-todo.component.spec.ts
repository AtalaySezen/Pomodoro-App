import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomotodoTodoComponent } from './pomotodo-todo.component';

describe('PomotodoTodoComponent', () => {
  let component: PomotodoTodoComponent;
  let fixture: ComponentFixture<PomotodoTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomotodoTodoComponent]
    });
    fixture = TestBed.createComponent(PomotodoTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
