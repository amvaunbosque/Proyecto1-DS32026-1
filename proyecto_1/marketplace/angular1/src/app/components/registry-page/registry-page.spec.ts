import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistryPage } from './registry-page';

describe('RegistryPage', () => {
  let component: RegistryPage;
  let fixture: ComponentFixture<RegistryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
