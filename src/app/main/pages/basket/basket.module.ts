import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { AuthGuard } from 'app/auth/helpers';
import { BasketComponent } from './basket-auth/basket-component';
// routing
const routes: Routes = [
  {
    path: 'panier',
    component: BasketComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    BasketComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CorePipesModule
  ]
})
export class BasketModule { }
