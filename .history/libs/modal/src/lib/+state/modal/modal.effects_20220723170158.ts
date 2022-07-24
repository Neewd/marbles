import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ModalActions from './modal.actions';
import * as ModalFeature from './modal.reducer';

@Injectable()
export class ModalEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalActions.initModal),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ModalActions.loadModalSuccess({ modal: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ModalActions.loadModalFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
