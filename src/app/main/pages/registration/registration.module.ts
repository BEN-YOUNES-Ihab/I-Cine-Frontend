import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { RegistrationComponent } from './registration/registration.component';
//import { AuthGuard } from 'app/auth/helpers/auth.guards';



const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { animation: 'registration' }
    //,canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    Ng2FlatpickrModule
    ]
})
export class RegistrationModule { }
