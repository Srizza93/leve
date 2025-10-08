import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
  constructor(private http: HttpClient) {}

  getFestivals() {
    return this.http.get('https://culture.opendatasoft.com/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/records?limit=100')
  }
}