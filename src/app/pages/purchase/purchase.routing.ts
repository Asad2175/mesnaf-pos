import { Routes, RouterModule } from '@angular/router';
import { CoupenComponent } from './coupen/coupen.component';
import { AccessCodeComponent } from './access-code/access-code.component';

const routes: Routes = [
  {  
    path: 'coupen',
    component: CoupenComponent
  },
  {  
    path: 'access-code',
    component: AccessCodeComponent
  },
];

export const PurchaseRoutes = RouterModule.forChild(routes);
