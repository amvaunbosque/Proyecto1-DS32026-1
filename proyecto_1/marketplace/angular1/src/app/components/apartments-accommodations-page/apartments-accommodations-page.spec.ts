import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApartmentsAccommodationsPage } from './apartments-accommodations-page';

describe('ApartmentsAccommodationsPage', () => {
  let component: ApartmentsAccommodationsPage;
  let fixture: ComponentFixture<ApartmentsAccommodationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsAccommodationsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsAccommodationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
