import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalsAccommodationsDetailsPage } from './animals-accommodations-details-page';

describe('AnimalsAccommodationsDetailsPage', () => {
  let component: AnimalsAccommodationsDetailsPage;
  let fixture: ComponentFixture<AnimalsAccommodationsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsAccommodationsDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalsAccommodationsDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
