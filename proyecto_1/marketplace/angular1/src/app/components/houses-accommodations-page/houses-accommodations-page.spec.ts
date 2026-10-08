import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesAccommodationsPage } from './houses-accommodations-page';

describe('HousesAccommodationsPage', () => {
  let component: HousesAccommodationsPage;
  let fixture: ComponentFixture<HousesAccommodationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesAccommodationsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesAccommodationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
