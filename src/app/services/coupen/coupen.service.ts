import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../app.module';
import { END_POINTS } from '../../constants/endpoints';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { Purchase } from '../../pages/purchase/purchaseItem';
import { Coupen } from '../../pages/purchase/coupen/Coupen';

@Injectable({
  providedIn: 'root'
})
export class CoupenService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}

  public verifyCoupen(coupen: string): Observable<Purchase> {
    return this.httpClient.get<BaseApiResponse<Purchase>>(this.backendUrl + END_POINTS.verifyCoupen(coupen)).pipe(map( (res: any) => Purchase.fromJSON(res.data)));
  }

  public submit(item: Coupen): Observable<Purchase> {
    return this.httpClient.post<BaseApiResponse<Purchase>>(this.backendUrl + END_POINTS.coupen, item.toJSON()).pipe(map( res => Purchase.fromJSON(res.data)));
  }

}
