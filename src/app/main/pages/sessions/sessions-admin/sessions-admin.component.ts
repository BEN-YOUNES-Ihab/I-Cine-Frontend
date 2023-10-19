import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'app/shared/services/modals.service';
import { French } from 'flatpickr/dist/l10n/fr';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ToastrService } from 'ngx-toastr';
import { SessionsService } from '../services/sessions.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-sessions-admin',
  templateUrl: './sessions-admin.component.html',
  styleUrls: ['./sessions-admin.component.scss']
})
export class SessionsAdminComponent implements OnInit {

  public showAdd !: boolean;
  public showUpdate !: boolean;
  public movieSubmitted = false;
  public error :string ="";

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    "locale": French,
  }
  private today = new Date();


  contentHeader: ContentHeader ;
  constructor(
    private sessionsService : SessionsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private modalsService : ModalsService
  ) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }

}
