import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatGenerateComponent } from './seat-generate.component';

describe('SeatGenerateComponent', () => {
  let component: SeatGenerateComponent;
  let fixture: ComponentFixture<SeatGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatGenerateComponent]
    });
    fixture = TestBed.createComponent(SeatGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
