import { Routes } from '@angular/router';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { tripDetailResolver } from '../resolvers/trip-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    component: TripsPageComponent
  },
  {
    path: 'trips',
    component: TripsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'trips/:id',
    loadComponent: () => import('./pages/trips-detail/trips-detail.component').then(m => m.TripsDetailComponent),
    resolve: {
      trip: tripDetailResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
