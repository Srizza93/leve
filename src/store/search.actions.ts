import { FestivalKeys } from '@/models/festival.model';
import { createAction, props } from '@ngrx/store';

export const setSearchInput = createAction(
  '[App Component] Set Search Input',
  props<{ searchInput: string }>()
);
export const setOrderBy = createAction(
  '[App Component] Set Order by Festival',
  props<{ orderBy: FestivalKeys }>()
);
