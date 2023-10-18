import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmActionModalComponent } from './modals/confirm-action-modal/confirm-action-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { LayoutModule } from 'app/layout/layout.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  declarations: [
    ConfirmActionModalComponent,
  ],
  imports: [],
  exports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    LayoutModule,
    Ng2FlatpickrModule
  ],
})
export class SharedModule { }
