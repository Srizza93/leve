import { Routes } from '@angular/router';
import {
  FestivalsPath,
  FestivalDetailPath,
  MapViewPath,
} from '@/constants/paths.constants';

export const routes: Routes = [
  { path: '', redirectTo: FestivalsPath, pathMatch: 'full' },
  {
    path: FestivalsPath,
    loadComponent: () =>
      import('@/pages/festivals-page/festivals-page.component').then(
        (m) => m.FestivalsPageComponent
      ),
  },
  {
    path: MapViewPath,
    loadComponent: () =>
      import('@/pages/map-view-page/map-view-page.component').then(
        (m) => m.MapViewPageComponent
      ),
  },
  {
    path: FestivalDetailPath,
    loadComponent: () =>
      import(
        '@/pages/festival-detail-page/festival-detail-page.component'
      ).then((m) => m.FestivalDetailPageComponent),
  },
  {
    path: '**',
    redirectTo: FestivalsPath,
    pathMatch: 'full',
  },
];
