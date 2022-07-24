import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { closeModal } from '../../+state/modal/modal.actions';
import { ModalFacadeService } from '../../+state/modal/modal.facade.service';
import { ModalState } from '../../+state/modal/modal.reducer';
import { ModalService } from './modal.service';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modalOpened$!: Observable<boolean>;
  modalTemplatemplate!: TemplateRef<HTMLElement>;

  constructor(
    private modalStore: Store<ModalState>,
    public modalFacadeService: ModalFacadeService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalOpened$ = this.modalFacadeService.modalOpened$;
    this.modalOpened$
      .pipe(filter((modalOpened) => modalOpened))
      .subscribe(
        (): TemplateRef<HTMLElement> =>
          (this.modalTemplatemplate = this.modalService.templateRef)
      );
  }

  closeModal(): void {
    this.modalStore.dispatch(closeModal());
  }
}
