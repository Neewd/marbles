import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { closeModal } from '../../+state/modal/modal.actions';
import { ModalFacadeService } from '../../+state/modal/modal.facade.service';
import { ModalState } from '../../+state/modal/modal.reducer';
import { ModalService } from './modal.service';
import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scale(1, 1)',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'scale(0.95, 0.95)',
        })
      ),
      transition('open => closed', [animate('100ms ease-in')]),
      transition('closed => open', [animate('200ms ease-out')]),
    ]),
  ],
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

  onCloseModal(): void {
    this.modalStore.dispatch(closeModal());
  }
}
