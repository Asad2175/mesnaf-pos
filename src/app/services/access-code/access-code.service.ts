import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.module';
import { Purchase } from '../../pages/purchase/purchase';
import { map, Observable } from 'rxjs';
import { PurchaseItem } from '../../pages/purchase/purchaseItem';
import { END_POINTS } from '../../constants/endpoints';
import { BaseApiResponse } from '../../helper/base-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {

constructor(private readonly httpClient: HttpClient,
  @Inject(API_URL) private backendUrl: string
) {}


  public save(item: Purchase): Observable<PurchaseItem> {
    return this.httpClient.post<BaseApiResponse<PurchaseItem>>(this.backendUrl + END_POINTS.accessCode, item.toJSON()).pipe(map( res => res.data));
  }
}
