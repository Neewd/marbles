import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ModalActions from './modal.actions';
import { ModalEffects } from './modal.effects';

describe('ModalEffects', () => {
  let actions: Observable<Action>;
  let effects: ModalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ModalEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ModalEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ModalActions.initModal() });

      const expected = hot('-a-|', {
        a: ModalActions.loadModalSuccess({ modal: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
