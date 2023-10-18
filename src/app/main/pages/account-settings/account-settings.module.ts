import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from 'app/auth/helpers/auth.guards';



const routes: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { animation: 'users' },
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    ]
})
export class AccountSettingsModule { }
