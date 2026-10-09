import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalsAccommodationsPage } from './rentals-accommodations-page';

describe('RentalsAccommodationsPage', () => {
  let component: RentalsAccommodationsPage;
  let fixture: ComponentFixture<RentalsAccommodationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsAccommodationsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalsAccommodationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
