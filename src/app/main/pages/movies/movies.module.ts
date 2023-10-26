import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesAdminComponent } from './movies-admin/movies-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { RoleGuard } from 'app/auth/helpers/role.guards';
import { AuthGuard } from 'app/auth/helpers';
// routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies-list',
    pathMatch: 'full'
  },
  {
    path: 'movies-list',
    component: MoviesListComponent,
    data: { animation: 'movies' }
  },
  {
    path: "movies-admin",
    component: MoviesAdminComponent,
    canActivate: [RoleGuard, AuthGuard]
  }
];

@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesAdminComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule
  ]
})
export class MoviesModule { }
