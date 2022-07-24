import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromModal from './+state/modal/modal.reducer';
import { ModalEffects } from './+state/modal/modal.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromModal.MODAL_FEATURE_KEY, fromModal.modalReducer),
    EffectsModule.forFeature([ModalEffects]),
  ],
})
export class ModalModule {}
