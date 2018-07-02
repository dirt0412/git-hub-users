import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorsDetailsComponent } from './contributors-details.component';

describe('ContributorsDetailsComponent', () => {
  let component: ContributorsDetailsComponent;
  let fixture: ComponentFixture<ContributorsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
