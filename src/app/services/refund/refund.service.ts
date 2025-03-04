import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.module';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { END_POINTS } from '../../constants/endpoints';
import { map, Observable } from 'rxjs';
import { RefundOne } from '../../pages/refund/refundOne';
import { VerifyRefund } from '../../pages/refund/verifyRefund';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}


  public redundStepOne(purchaseTransId: string): Observable<RefundOne> {
    return this.httpClient.post<BaseApiResponse<RefundOne>>(this.backendUrl + END_POINTS.refundStepOne, {purchaseTransId}).pipe(map( res => RefundOne.fromJSON(res.data)));
  }
  
  public refundStepTwo(refund: VerifyRefund): Observable<any> {
    return this.httpClient.post<BaseApiResponse<any>>(this.backendUrl + END_POINTS.refundStepTwo, refund.toJSON()).pipe(map( res => res));
  }

}
