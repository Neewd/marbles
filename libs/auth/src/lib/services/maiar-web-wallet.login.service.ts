import { Inject, Injectable } from '@angular/core';
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import { APP_CONFIG } from '@marbles/app-config';
import { Store } from '@ngrx/store';
import { AuthState } from '../+state/auth/auth.reducer';
import { LoginService } from './login.service';

@Injectable()
export class MaiarWebWalletLoginService implements LoginService {
  provider: WalletProvider;
  callbackUrl: string;
  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private authStore: Store<AuthState>
  ) {
    this.provider = new WalletProvider(this.appConfig.walletProviderUrl);
    this.callbackUrl = encodeURIComponent(this.appConfig.callbackUrl);
  }
  async login(): Promise<void> {
    setTimeout(async () => {
      await this.provider.login({ callbackUrl: this.callbackUrl });
    }, 1000);
  }
  async logout(): Promise<void> {
    await this.provider.logout({ callbackUrl: this.callbackUrl });
  }
}
