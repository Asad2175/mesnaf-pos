import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.module';
import { map, Observable } from 'rxjs';
import { END_POINTS } from '../../constants/endpoints';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { AccessCode } from '../../pages/purchase/access-code/access-code';
import { Purchase } from '../../pages/purchase/purchaseItem';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}


  public save(item: AccessCode): Observable<Purchase> {
    return this.httpClient.post<BaseApiResponse<Purchase>>(this.backendUrl + END_POINTS.accessCode, item.toJSON()).pipe(map( res => Purchase.fromJSON(res.data)));
  }
}
