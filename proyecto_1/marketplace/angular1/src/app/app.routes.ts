import { Routes } from '@angular/router';
import { WelcomePage } from './components/welcome-page/welcome-page';
import { HomePage } from './components/home-page/home-page';
import { RegistryPage } from './components/registry-page/registry-page';
import { UserPage } from './components/user-page/user-page';
import { FilterPage } from './components/filter-page/filter-page';
import { HousesAccommodationsDetailsPage } from './components/houses-accommodations-details-page/houses-accommodations-details-page';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePage },
  { path: 'home', component: HomePage },
  { path: 'registry', component: RegistryPage },
  { path: 'user', component: UserPage },
  { path: 'filter', component: FilterPage },
  { path: 'detalle/casas/:id', component: HousesAccommodationsDetailsPage },
  { path: '**', redirectTo: 'home' }
];