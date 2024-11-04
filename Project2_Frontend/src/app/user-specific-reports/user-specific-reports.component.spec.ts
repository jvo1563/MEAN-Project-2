import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecificReportsComponent } from './user-specific-reports.component';

describe('UserSpecificReportsComponent', () => {
  let component: UserSpecificReportsComponent;
  let fixture: ComponentFixture<UserSpecificReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSpecificReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSpecificReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
