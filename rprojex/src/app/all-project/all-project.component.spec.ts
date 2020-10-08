import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectComponent } from './all-project.component';

describe('AllProjectComponent', () => {
  let component: AllProjectComponent;
  let fixture: ComponentFixture<AllProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
