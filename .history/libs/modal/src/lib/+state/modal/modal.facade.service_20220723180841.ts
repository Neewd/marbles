import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalState } from './modal.reducer';
import { getModalOpened } from './modal.selectors';

@Injectable()
export class ModalFacadeService {
  modalOpened$: Observable<boolean>;

  constructor(private store: Store<ModalState>) {
    this.modalOpened$ = this.store.select(getModalOpened);
  }
}
