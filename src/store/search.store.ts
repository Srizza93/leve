import { FestivalKeys } from '@/models/festival.model';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface SearchState {
  searchInput: string;
  orderBy: FestivalKeys;
}

@Injectable()
export class SearchStore extends ComponentStore<SearchState> {
  constructor() {
    super({ searchInput: '', orderBy: FestivalKeys.NOM_DU_FESTIVAL });
  }

  readonly searchInput$ = this.select((state) => state.searchInput);
  readonly orderBy$ = this.select((state) => state.orderBy);

  readonly updateSearchInput = this.updater((state, searchedInput: string) => ({
    ...state,
    searchInput: searchedInput,
  }));
}
