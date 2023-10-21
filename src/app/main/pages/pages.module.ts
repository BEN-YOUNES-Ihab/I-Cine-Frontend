import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { UsersModule } from './users/users.module';
import { RegistrationModule } from './registration/registration.module';
import { MoviesModule } from './movies/movies.module';
import { SessionModule } from './sessions/sessions.module';
import { OrderModule } from './orders/orders.module';
import { BasketModule } from './basket/basket.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    UsersModule,
    RegistrationModule,
    AccountSettingsModule,
    MoviesModule,
    SessionModule,
    OrderModule,
    BasketModule
    
  ],

  providers: []
})
export class PagesModule {}
