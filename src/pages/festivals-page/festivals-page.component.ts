import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FestivalService } from '@/services/festival.services';
import { FestivalCardComponent } from '@/components/festival-card/festival-card.component';
import {
  Festival,
  FestivalResponse,
  FestivalKeys,
  festivalKeyTranslation,
} from '@/models/festival.model';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { SearchState } from '@/store/search.reducer';

@Component({
  selector: 'festivals-page',
  templateUrl: './festivals-page.component.html',
  styleUrls: ['./festivals-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FestivalCardComponent,
    MatDividerModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class FestivalsPageComponent {
  festivals: Festival[] = [];
  isLoading: boolean = false;
  pageSize: number = 5;
  pageIndex: number = 1;
  itemsLength: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchInput$: Observable<string>;
  orderBy: FormControl<keyof Festival | null> = new FormControl(
    FestivalKeys.NOM_DU_FESTIVAL,
    []
  );
  festivalKeys = this.mapFestivalKeysForSelction();

  constructor(
    private festivalService: FestivalService,
    private store: Store<{ search: SearchState }>
  ) {
    this.searchInput$ = this.store.select((state) => state.search.searchInput);
  }

  mapFestivalKeysForSelction() {
    return Object.values(FestivalKeys)
      .map((key) => {
        const translation = festivalKeyTranslation[key] ?? null;
        return {
          value: key,
          valueView: translation,
        };
      })
      .filter((option) => !!option.valueView);
  }

  handlePageEvent(event: any) {
    const hasPageSizeChanged: boolean = this.pageSize != event.pageSize;
    const hasPageIndexChanged: boolean = this.pageIndex != event.pageIndex + 1;

    if (hasPageSizeChanged || hasPageIndexChanged) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex + 1;
      this.getFestivals();
    }
  }

  getFestivals() {
    this.isLoading = true;

    this.store
      .select((state) => state.search.searchInput)
      .pipe(take(1))
      .subscribe((searchInput) => {
        this.festivalService
          .getFestivals(
            this.pageIndex,
            this.pageSize,
            this.orderBy.value,
            searchInput
          )
          .subscribe({
            next: (response: FestivalResponse) => {
              this.festivals = response.results;
              this.itemsLength = response.total_count;
              this.isLoading = false;
            },
            error: (e) => {
              console.error(e);
              this.isLoading = false;
            },
          });
      });
  }

  handleSort() {
    this.orderBy.valueChanges.subscribe(() => this.getFestivals());
  }

  ngOnInit() {
    this.getFestivals();
    this.handleSort();
  }
}
