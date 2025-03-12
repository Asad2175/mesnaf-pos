import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {  
    path: '',
    component: TransactionsComponent
  },
];

export const TransactionsRoutes = RouterModule.forChild(routes);
