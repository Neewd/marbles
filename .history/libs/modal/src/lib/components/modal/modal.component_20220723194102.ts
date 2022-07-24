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
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('opacityTranslateY', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1rem)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(1rem)' })
        ),
      ]),
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
