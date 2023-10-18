import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsAdminComponent } from './sessions-admin/sessions-admin.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
// routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions-list',
    pathMatch: 'full'
  },
  {
    path: 'sessions-list',
    component: SessionsListComponent,
    data: { animation: 'movies' }
  },
  {
    path: "sessions-admin",
    component: SessionsAdminComponent
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
