import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalState } from './modal.reducer';
import { getModalOpened } from './modal.selectors';

@Injectable()
export class ModalFacadeService implements OnInit {
  modalOpened$: Observable<boolean>;

  constructor(private store: Store<ModalState>) {}

  ngOnInit(): void {
    this.modalOpened$ = this.store.select(getModalOpened);
  }
}
