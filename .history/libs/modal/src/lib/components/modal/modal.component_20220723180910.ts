import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from '../../+state/modal/modal.actions';
import { ModalFacadeService } from '../../+state/modal/modal.facade.service';
import { ModalState } from '../../+state/modal/modal.reducer';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() closable!: boolean;
  @Input() templateRef!: TemplateRef<any>;

  modalOpened!: boolean;

  constructor(
    private store: Store<ModalState>,
    public modalFacadeService: ModalFacadeService
  ) {}

  closeModal(): void {
    this.store.dispatch(closeModal());
  }
}
