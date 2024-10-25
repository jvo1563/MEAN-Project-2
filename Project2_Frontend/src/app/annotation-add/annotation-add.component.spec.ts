import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationAddComponent } from './annotation-add.component';

describe('AnnotationAddComponent', () => {
  let component: AnnotationAddComponent;
  let fixture: ComponentFixture<AnnotationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
