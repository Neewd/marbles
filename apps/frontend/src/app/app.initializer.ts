import { AuthState, getAppInitialized, loadLocalStorageData } from '@marbles/auth';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

export function initApplication(store: Store<AuthState>): Function {
  return () =>
    new Promise((resolve) => {
      store.dispatch(loadLocalStorageData());
      store
        .select(getAppInitialized)
        .pipe(filter((appInitialized) => appInitialized))
        .subscribe((appInitialized) => {
          resolve(true);
        });
    });
}
