import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../app.module';
import { END_POINTS } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}

  public update(transId: number, invoiceNo: string): Observable<any> {
    return this.httpClient.put<any>(this.backendUrl + END_POINTS.updateInvoice, {transId, invoiceNo}).pipe(map( res => res));
  }

}
