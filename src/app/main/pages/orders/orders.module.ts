import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { RoleGuard } from 'app/auth/helpers/role.guards';
import { AuthGuard } from 'app/auth/helpers';
import { OrderComponent } from './order/order.component';
import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from '@core/common.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders-list',
    pathMatch: 'full'
  },
  {
    path: 'orders-list',
    component: OrdersListComponent,
    data: { animation: 'movies' },
    canActivate: [AuthGuard]
  },
  {
    path: ":id/orders-admin",
    component: OrdersAdminComponent,
    canActivate: [RoleGuard, AuthGuard]
  },
  {
    path: ":id/order",
    component: OrderComponent
    //,canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: ":id/order/:status",
    component: OrderComponent
    //,canActivate: [AuthGuard, RoleGuard]
  }
];

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersAdminComponent,
    OrderComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule,
    CoreSidebarModule,
    CoreCommonModule,
    PerfectScrollbarModule
  ]
})
export class OrderModule { }
