import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskComponent } from './all-task.component';

describe('AllTaskComponent', () => {
  let component: AllTaskComponent;
  let fixture: ComponentFixture<AllTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
