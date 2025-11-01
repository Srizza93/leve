import { Component, AfterViewInit } from '@angular/core';
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
import { FestivalCardComponent } from '@/components/festival-card/festival-card.component';
import {
  Festival,
  FestivalResponse,
  FestivalKeys,
  festivalKeyTranslation,
} from '@/models/festival.model';
import { SearchStore } from '@/store/search.store';
import * as L from 'leaflet';

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
export class FestivalsPageComponent implements AfterViewInit {
  private map!: L.Map;
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

  constructor(
    private readonly festivalService: FestivalService,
    private readonly searchStore: SearchStore,
    public urlUtils: UrlUtils
  ) {}

  get searchInput$() {
    return this.searchStore.searchInput$;
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
            this.isLoading = false;
            this.updateMapMarkers();
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

  private updateMapMarkers(): void {
    if (!this.map || !this.festivals.length) return;

    this.map.eachLayer((layer) => {
      if ((layer as any).getLatLng) this.map.removeLayer(layer);
    });

    const markers: L.Marker[] = [];
    this.festivals.forEach((f) => {
      if (f.geocodage_xy?.lat && f.geocodage_xy.lon) {
        const popupContent = `
        <div style="min-width:150px">
          <strong>${f.nom_du_festival}</strong>
          <br><br> 📅 ${
            f.periode_principale_de_deroulement_du_festival || 'Unknown date'
          }
          <br>📍 ${f.commune_principale_de_deroulement || 'Unknown location'}
          <br>
          <span>🔗 <a href="${this.urlUtils.formatUrl(
            f.site_internet_du_festival
          )}" style="display: contents;">Link</a></span>
        </div>
      `;

        const marker = L.marker([f.geocodage_xy.lat, f.geocodage_xy.lon])
          .addTo(this.map)
          .bindPopup(popupContent);

        markers.push(marker);
      }
    });

    if (markers.length) {
      const group = L.featureGroup(markers);
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  ngOnInit() {
    this.loadFestivals();
    this.handleSort();
  }

  ngAfterViewInit() {
    this.initMap();
  }
}
