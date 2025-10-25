// src/app/store/search.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setSearchInput, setOrderBy } from '@/store/search.actions';
import { FestivalKeys } from '@/models/festival.model';

export interface SearchState {
  searchInput: string;
  orderBy: FestivalKeys;
}

export const initialState: SearchState = {
  searchInput: '',
  orderBy: FestivalKeys.NOM_DU_FESTIVAL,
};

export const searchReducer = createReducer(
  initialState,
  on(setSearchInput, (state, { searchInput }) => ({
    ...state,
    searchInput,
  })),
  on(setOrderBy, (state, { orderBy }) => ({
    ...state,
    orderBy,
  }))
);
