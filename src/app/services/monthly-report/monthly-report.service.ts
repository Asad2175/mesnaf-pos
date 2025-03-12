import { Inject, Injectable } from '@angular/core';
import { END_POINTS } from '../../constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.module';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { MonthlyReport } from '../../pages/monthly-report/monthly-report';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {

  constructor(private readonly httpClient: HttpClient,
    @Inject(API_URL) private backendUrl: string
  ) {}


  public getMontlyReport(startDate: string, endDate: string): Observable<MonthlyReport> {
    return this.httpClient
      .get<BaseApiResponse<MonthlyReport>>(this.backendUrl + END_POINTS.monthlyReport(startDate, endDate)).pipe(map(res => MonthlyReport.fromJSON(res.data)))
  }

}
