import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesAdminComponent } from './movies-admin/movies-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { RoleGuard } from 'app/auth/helpers/role.guards';
import { AuthGuard } from 'app/auth/helpers';
import { SwiperDirective } from './directives/swiper.directive';
import { MoviesHomeComponent } from './movies-home/movies-home.component';
// routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies-home',
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
  },
  {
    path: "movies-home",
    component: MoviesHomeComponent
  }
];

@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesAdminComponent,
    SwiperDirective,
    MoviesHomeComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesModule { }
