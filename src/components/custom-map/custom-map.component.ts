import {
  Component,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { UrlUtils } from '@/utils/url.utils';
import * as L from 'leaflet';

export interface MapItem {
  title?: string;
  date?: string | null;
  location?: string;
  link?: string | null;
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
  private map!: L.Map;

  constructor(public urlUtils: UrlUtils) {}

  public updateMapMarkers(): void {
    if (!this.map || !this.mapItems.length) return;

    this.map.eachLayer((layer) => {
      if ((layer as any).getLatLng) this.map.removeLayer(layer);
    });

    const markers: L.Marker[] = [];
    this.mapItems.forEach((item) => {
      if (item.geocode.latitude && item.geocode.longitude) {
        const popupContent = `
        <div style="min-width:150px">
          <strong>${item.title}</strong>
          <br><br> 📅 ${item.date || 'Unknown date'}
          <br>📍 ${item.location || 'Unknown location'}
          <br>
          <span>🔗 <a href="${this.urlUtils.formatUrl(
            item.link
          )}" style="display: contents;">Link</a></span>
        </div>
      `;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mapItems'] && this.map) {
      this.updateMapMarkers();
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }
}
