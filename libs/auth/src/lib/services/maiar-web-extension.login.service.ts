import { Injectable } from '@angular/core';
import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import { Store } from '@ngrx/store';
import { loginSuccess } from '../+state/auth/auth.actions';
import { AuthEntity } from '../+state/auth/auth.models';
import { AuthState } from '../+state/auth/auth.reducer';
import { LoginService } from './login.service';

@Injectable()
export class MaiarWebExtensionLoginService implements LoginService {
  provider: ExtensionProvider;
  
  constructor(
    private authStore: Store<AuthState>
  ) {
    this.provider = ExtensionProvider.getInstance();
  } 

  async login(): Promise<void> {
    try {
      await this.provider.init();
    } catch (err) {
      return;
    }
    
    const address = await this.provider.login();
    const authEntity: AuthEntity = {
      address,
    };
    this.authStore.dispatch(loginSuccess({ authEntity }));
  }

  async logout(): Promise<void> {
    await this.provider.logout();
  }
}
