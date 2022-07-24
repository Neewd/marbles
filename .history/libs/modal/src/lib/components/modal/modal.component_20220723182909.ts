import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeModal } from '../../+state/modal/modal.actions';
import { ModalFacadeService } from '../../+state/modal/modal.facade.service';
import { ModalState } from '../../+state/modal/modal.reducer';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() closable!: boolean;
  @Input() templateRef!: TemplateRef<any>;

  modalOpened$!: Observable<boolean>;

  constructor(
    private modalStore: Store<ModalState>,
    public modalFacadeService: ModalFacadeService
  ) {}

  ngOnInit(): void {
    this.modalOpened$ = this.modalFacadeService.modalOpened$;
  }

  closeModal(): void {
    this.modalStore.dispatch(closeModal());
  }
}
