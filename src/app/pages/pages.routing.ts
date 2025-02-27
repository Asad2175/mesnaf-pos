import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)},
  {path: 'refund', loadChildren: () => import('./refund/refund.module').then( m => m.RefundModule)},
  {path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then( m => m.PurchaseModule)},
];

export const PagesRoutes = RouterModule.forChild(routes);
