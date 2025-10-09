import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivalResponse } from '@/models/festival.model';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
  private apiUrl =
    'https://culture.opendatasoft.com/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/records?limit=100';

  constructor(private http: HttpClient) {}

  getFestivals(): Observable<FestivalResponse> {
    return this.http.get<FestivalResponse>(this.apiUrl);
  }
}
