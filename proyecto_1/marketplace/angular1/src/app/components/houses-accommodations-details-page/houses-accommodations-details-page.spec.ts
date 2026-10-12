import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesAccommodationsDetailsPage } from './houses-accommodations-details-page';

describe('HousesAccommodationsDetailsPage', () => {
  let component: HousesAccommodationsDetailsPage;
  let fixture: ComponentFixture<HousesAccommodationsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesAccommodationsDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesAccommodationsDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
