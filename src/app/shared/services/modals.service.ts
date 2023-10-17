import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionModalComponent } from '../modals/confirm-action-modal/confirm-action-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private modal: NgbModal) { }

  openConfirmationModal(message: string, modalClass: 'danger' | 'warning' | 'success' | 'primary' = 'danger', buttonText = 'Confirmer') {
    const modalRef = this.modal.open(ConfirmActionModalComponent, {
      size: 'md',
      windowClass: 'modal modal-' + modalClass,
      centered: true
    });
    modalRef.componentInstance.message= message;
    modalRef.componentInstance.modalClass= modalClass;
    modalRef.componentInstance.buttonText = buttonText;
    
    return modalRef.result;
    
  }
}
