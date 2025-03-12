import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import moment from 'moment';
import { LoaderService } from '../../services/loader/loader.service';
import { MonthlyReportService } from '../../services/monthly-report/monthly-report.service';
import { MonthlyReport } from './monthly-report';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {
  public startDate = moment().startOf('month').format('YYYY-MM-DD');
  public endDate = moment().endOf('month').format('YYYY-MM-DD');
  public monthlyReport!: MonthlyReport;

  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly loaderService: LoaderService,
    private readonly monthlyReportService: MonthlyReportService
  ) { }

  ngOnInit() {
    this.getDate();
  }

  public goBack(): void {
    this.navigationHelperService.navigateTo('/');
  }

  public getDate(): void {
    const START_DATE = moment(this.startDate).format('YYYY-MM-DD');
    const END_DATE = moment(this.endDate).format('YYYY-MM-DD');
    this.loaderService.start();
    this.monthlyReportService.getMontlyReport(START_DATE, END_DATE).subscribe({
      next: (res: MonthlyReport) => {
        this.monthlyReport = res;
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
      }
    })
  }

}
