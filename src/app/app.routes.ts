import { Routes } from '@angular/router';
import { FestivalDetailComponent } from '@/pages/festival-detail/festival-detail.component';
import {
  FestivalDetailPath
} from '@/constants/paths.constants';

export const routes: Routes = [
  {
    path: FestivalDetailPath,
    loadComponent: () =>
      import('@/pages/festival-detail/festival-detail.component').then(
        (m) => m.FestivalDetailComponent
      ),
  },
  { path: '**', component: FestivalDetailComponent },
];