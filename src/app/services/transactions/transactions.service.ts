import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.module';
import { map, Observable } from 'rxjs';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { END_POINTS } from '../../constants/endpoints';
import { Transactions } from '../../pages/transactions/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}


  public getTransactions(): Observable<Transactions[]> {
    return this.httpClient
      .get<BaseApiResponse<Transactions[]>>(this.backendUrl + END_POINTS.transactions)
      .pipe(
        map(res => res.data.map(transaction => Transactions.fromJSON(transaction)))
      );
  }

}
