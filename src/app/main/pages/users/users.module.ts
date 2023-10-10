import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { UsersComponent } from './users/users.component';
import { RoleGuard } from 'app/auth/helpers/role.guards';
//import { AuthGuard } from 'app/auth/helpers/auth.guards';



const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { animation: 'users' },
    canActivate: [RoleGuard]
    //,canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    ]
})
export class UsersModule { }
