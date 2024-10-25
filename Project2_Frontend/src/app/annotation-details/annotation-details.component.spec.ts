import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationDetailsComponent } from './annotation-details.component';

describe('AnnotationDetailsComponent', () => {
  let component: AnnotationDetailsComponent;
  let fixture: ComponentFixture<AnnotationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
