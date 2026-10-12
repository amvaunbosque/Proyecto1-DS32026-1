import { Routes } from '@angular/router';
import { WelcomePage } from './components/welcome-page/welcome-page';
import { HomePage } from './components/home-page/home-page';
import { RegistryPage } from './components/registry-page/registry-page';
import { UserPage } from './components/user-page/user-page';
import { FilterPage } from './components/filter-page/filter-page';
import { HousesAccommodationsDetailsPage } from './components/houses-accommodations-details-page/houses-accommodations-details-page';
import { ApartmentsAccommodationsDetailsPage } from './components/apartments-accommodations-details-page/apartments-accommodations-details-page';
import { AnimalsAccommodationsDetailsPage } from './components/animals-accommodations-details-page/animals-accommodations-details-page';
import { BookingsPage } from './components/bookings-page/bookings-page';
import { HousesAccommodationsPage } from './components/houses-accommodations-page/houses-accommodations-page';
import { ApartmentsAccommodationsPage } from './components/apartments-accommodations-page/apartments-accommodations-page';
import { AnimalsAccommodationsPage } from './components/animals-accommodations-page/animals-accommodations-page';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePage },
  { path: 'home', component: HomePage },
  { path: 'registry', component: RegistryPage },
  { path: 'user', component: UserPage },
  { path: 'bookings', component: BookingsPage },
  { path: 'filter', component: FilterPage },
  { path: 'casas', component: HousesAccommodationsPage },
  { path: 'apartamentos', component: ApartmentsAccommodationsPage },
  { path: 'animales', component: AnimalsAccommodationsPage },
  { path: 'detalle/casas/:id', component: HousesAccommodationsDetailsPage },
  { path: 'detalle/apartamentos/:id', component: ApartmentsAccommodationsDetailsPage},
  { path: 'detalle/animales/:id', component: AnimalsAccommodationsDetailsPage},
  { path: '**', redirectTo: 'home'},
];