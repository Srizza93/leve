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
import { UrlUtils } from '@/utils/url.utils';
import {
  CustomMapComponent,
  MapEvent,
  MapItem,
} from '@/components/custom-map/custom-map.component';
import {
  Festival,
  FestivalResponse,
  FestivalKeys,
  festivalKeyTranslation,
} from '@/models/festival.model';
import { SearchStore } from '@/store/search.store';
import { Router } from '@angular/router';
import { FestivalDetailPath } from '@/constants/paths.constants';

@Component({
  selector: 'map-view-page',
  templateUrl: './map-view-page.component.html',
  styleUrls: ['./map-view-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CustomMapComponent,
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
export class MapViewPageComponent {
  festivals: Festival[] = [];
  isLoading: boolean = false;
  pageSize: number = 5;
  pageIndex: number = 1;
  itemsLength: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  orderBy: FormControl<keyof Festival | null> = new FormControl(
    FestivalKeys.NOM_DU_FESTIVAL,
    []
  );
  festivalKeys = this.mapFestivalKeysForSelction();
  mapItems: MapItem[] = [];

  constructor(
    private readonly festivalService: FestivalService,
    private readonly searchStore: SearchStore,
    private readonly router: Router,
    public urlUtils: UrlUtils
  ) {}

  get searchInput$() {
    return this.searchStore.searchInput$;
  }

  updateMapItems() {
    this.mapItems = this.festivals.map((festival: Festival) => ({
      id: festival.identifiant,
      title: festival.nom_du_festival,
      date: festival.periode_principale_de_deroulement_du_festival,
      location: festival.commune_principale_de_deroulement,
      link: festival.site_internet_du_festival,
      geocode: {
        latitude: festival.geocodage_xy?.lat,
        longitude: festival.geocodage_xy?.lon,
      },
      actions: [
        { name: 'access-festival-details', label: 'See festival info' },
      ],
    }));
  }

  handleMapEvent(event: MapEvent) {
    if (event.actionId === 'access-festival-details') {
      this.router.navigate([FestivalDetailPath], {
        queryParams: { festivalId: event.id },
      });
    }
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
      this.loadFestivals();
    }
  }

  loadFestivals() {
    this.isLoading = true;

    this.searchInput$.subscribe((value: string) => {
      this.festivalService
        .getFestivals(this.pageIndex, this.pageSize, this.orderBy.value, value)
        .subscribe({
          next: (response: FestivalResponse) => {
            this.festivals = response.results;
            this.itemsLength = response.total_count;
            this.updateMapItems();
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
    this.orderBy.valueChanges.subscribe(() => this.loadFestivals());
  }

  ngOnInit() {
    this.loadFestivals();
    this.handleSort();
  }
}
