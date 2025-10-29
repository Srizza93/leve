import { Routes } from '@angular/router';
import { FestivalsPath, FestivalDetailPath } from '@/constants/paths.constants';

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
