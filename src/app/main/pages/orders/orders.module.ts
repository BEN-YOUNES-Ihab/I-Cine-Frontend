import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { RoleGuard } from 'app/auth/helpers/role.guards';
import { AuthGuard } from 'app/auth/helpers';
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
    path: "orders-admin",
    component: OrdersAdminComponent,
    canActivate: [RoleGuard, AuthGuard]
  }
];

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersAdminComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule
  ]
})
export class OrderModule { }
