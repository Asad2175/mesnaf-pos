import { Routes, RouterModule } from '@angular/router';
import { RefundComponent } from './refund.component';

const routes: Routes = [
  {  
    path: '',
    component: RefundComponent
  },
];

export const RefundRoutes = RouterModule.forChild(routes);
