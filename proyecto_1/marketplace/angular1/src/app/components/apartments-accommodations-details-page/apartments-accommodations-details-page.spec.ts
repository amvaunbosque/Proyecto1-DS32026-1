import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartmentsAccommodationsDetailsPage } from './apartments-accommodations-details-page';

describe('ApartmentsAccommodationsDetailsPage', () => {
  let component: ApartmentsAccommodationsDetailsPage;
  let fixture: ComponentFixture<ApartmentsAccommodationsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsAccommodationsDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsAccommodationsDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
