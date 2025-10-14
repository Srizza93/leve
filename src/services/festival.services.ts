import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festival, FestivalKeys, FestivalResponse } from '@/models/festival.model';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
  private apiUrl =
    'https://culture.opendatasoft.com/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/records';

  constructor(private http: HttpClient) {}

  getFestivals(pageIndex: number, pageSize: number, orderBy?: keyof Festival | null, searchInput?: string | null): Observable<FestivalResponse> {
    const offset = (pageIndex - 1) * pageSize;
    const whereClause = searchInput ? FestivalKeys.NOM_DU_FESTIVAL + " like '" + searchInput + "'" : "";
    const orderClause = orderBy ?? FestivalKeys.NOM_DU_FESTIVAL

    const params = new HttpParams()
      .set("where", whereClause)
      .set('order_by', orderClause)
      .set('limit', pageSize.toString())
      .set('offset', offset.toString());
    
    return this.http.get<FestivalResponse>(this.apiUrl, { params });
  }
}
