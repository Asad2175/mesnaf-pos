import { Routes, RouterModule } from '@angular/router';
import { MonthlyReportComponent } from './monthly-report.component';

const routes: Routes = [
  {  
    path: '',
    component: MonthlyReportComponent
  },
];

export const MontlyReportRoutes = RouterModule.forChild(routes);
