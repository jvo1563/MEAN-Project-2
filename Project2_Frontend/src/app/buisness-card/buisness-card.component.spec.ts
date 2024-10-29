import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessCardComponent } from './buisness-card.component';

describe('BusinessCardComponent', () => {
  let component: BuisnessCardComponent;
  let fixture: ComponentFixture<BuisnessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuisnessCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuisnessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
