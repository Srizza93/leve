import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import {
  Festival,
  FestivalKeys,
  FestivalResponse,
} from '@/models/festival.model';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
  private apiUrl = `${environment.apiUrl}/datasets/festivals-global-festivals-_-pl/records`;

  constructor(private http: HttpClient) {}

  getFestivals(
    pageIndex: number,
    pageSize: number,
    orderBy?: keyof Festival | null,
    searchInput?: string | null
  ): Observable<FestivalResponse> {
    const offset = (pageIndex - 1) * pageSize;
    const whereClause = this.getWhereClause(searchInput);
    const orderClause = Object.values(FestivalKeys).includes(orderBy as any)
      ? (orderBy as string)
      : FestivalKeys.NOM_DU_FESTIVAL;

    let params = new HttpParams()
      .set('order_by', orderClause)
      .set('limit', pageSize.toString())
      .set('offset', offset.toString());

    if (whereClause) {
      params = params.set('where', whereClause);
    }

    return this.http.get<FestivalResponse>(this.apiUrl, { params });
  }

  getWhereClause(searchInput?: string | null): string | null {
    if (!searchInput) {
      return null;
    }

    const safeInput = searchInput.trim().replace(/'/g, "''");
    return (
      `${FestivalKeys.NOM_DU_FESTIVAL} like '%${safeInput}%' OR ` +
      `${FestivalKeys.COMMUNE_PRINCIPALE_DE_DEROULEMENT} like '%${safeInput}%' OR ` +
      `${FestivalKeys.DEPARTEMENT_PRINCIPAL_DE_DEROULEMENT} like '%${safeInput}%'`
    );
  }
}
