import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationTableComponent } from './annotation-table.component';

describe('AnnotationTableComponent', () => {
  let component: AnnotationTableComponent;
  let fixture: ComponentFixture<AnnotationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
