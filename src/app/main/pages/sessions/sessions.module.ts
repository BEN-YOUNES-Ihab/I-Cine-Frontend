import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsAdminComponent } from './sessions-admin/sessions-admin.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { RoleGuard } from 'app/auth/helpers/role.guards';
import { AuthGuard } from 'app/auth/helpers';
// routing
const routes: Routes = [
  {
    path: ':id/sessions-list',
    component: SessionsListComponent,
    data: { animation: 'sessions' }
  },
  {
    path: ":id/sessions-admin",
    component: SessionsAdminComponent,
    canActivate: [RoleGuard, AuthGuard]
  }
];

@NgModule({
  declarations: [
    SessionsListComponent,
    SessionsAdminComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule
  ]
})
export class SessionModule { }
