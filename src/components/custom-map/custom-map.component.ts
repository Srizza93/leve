import {
  Component,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { UrlUtils } from '@/utils/url.utils';
import * as L from 'leaflet';

export interface MapEvent {
  id: string;
  actionId: string;
}

export interface MapAction {
  name: string;
  label: string;
}

export interface MapItem {
  id?: string;
  title?: string;
  date?: string | null;
  location?: string;
  link?: string | null;
  actions?: MapAction[];
  geocode: {
    latitude?: number;
    longitude?: number;
  };
}

@Component({
  selector: 'custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.scss'],
  standalone: true,
  imports: [],
})
export class CustomMapComponent implements AfterViewInit, OnChanges {
  @Input() mapItems: MapItem[] = [];
  @Output() mapEvent = new EventEmitter<MapEvent>();
  private map!: L.Map;

  constructor(public urlUtils: UrlUtils) {}

  private buildPopUpContent(item: MapItem): string {
    const title = item.title ? `<strong>${item.title}</strong><br>` : null;
    const date = item.date ? `<br> 📅 ${item.date || 'Unknown date'}` : null;
    const location = item.location ? `<br>📍 ${item.location}` : null;
    const link = item.link
      ? `<br><span>🔗 <a href="${this.urlUtils.formatUrl(
          item.link
        )}" style="display: contents;">Link</a></span>`
      : null;
    const actions =
      item.actions && item.actions?.length > 0
        ? item.actions.map(
            (action: MapAction) =>
              `<br><br><button style="background-color: white; border: 1px solid #3f51b5; padding: 5px 8px; font-weight: bold; width: 100%; border-radius: 5px; cursor: pointer;" id="${action.name}" action-id="${item?.id}">${action.label}</button>`
          )
        : null;

    return `<div style="min-width:150px">
               ${title}
               ${date}
               ${location}
               ${link}
               ${actions}
            </div>
           `;
  }

  public updateMapMarkers(): void {
    if (!this.map || !this.mapItems.length) return;

    this.map.eachLayer((layer) => {
      if ((layer as any).getLatLng) this.map.removeLayer(layer);
    });

    const markers: L.Marker[] = [];
    this.mapItems.forEach((item) => {
      if (item.geocode.latitude && item.geocode.longitude) {
        const popupContent = this.buildPopUpContent(item);

        const marker = L.marker([item.geocode.latitude, item.geocode.longitude])
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

  initButtonsEvents() {
    document.addEventListener('click', (event: Event) => {
      const actionsNames = Array.from(
        new Set(
          this.mapItems
            .map((item: MapItem) =>
              item.actions?.map((action: MapAction) => action.name)
            )
            .join()
            .split(',')
        )
      );

      const target = event.target as HTMLElement;
      const id = target.getAttribute('id');
      const actionId = target.getAttribute('action-id') ?? '';
      if (id && actionsNames.includes(id)) {
        this.mapEvent.emit({ actionId: id, id: actionId });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapItems'] && this.map) {
      this.updateMapMarkers();
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnInit() {
    this.initButtonsEvents();
  }
}
