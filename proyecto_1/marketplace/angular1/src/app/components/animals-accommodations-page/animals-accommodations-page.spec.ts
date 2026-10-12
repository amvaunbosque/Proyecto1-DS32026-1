import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalsAccommodationsPage } from './animals-accommodations-page';

describe('AnimalsAccommodationsPage', () => {
  let component: AnimalsAccommodationsPage;
  let fixture: ComponentFixture<AnimalsAccommodationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsAccommodationsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalsAccommodationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
