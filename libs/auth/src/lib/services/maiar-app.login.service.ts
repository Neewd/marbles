import { Inject, Injectable } from '@angular/core';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { APP_CONFIG } from '@marbles/app-config';
import { Store } from '@ngrx/store';
import * as QRCode from 'qrcode';
import { loginSuccess, logout } from '../+state/auth/auth.actions';
import { AuthEntity } from '../+state/auth/auth.models';
import { AuthState } from '../+state/auth/auth.reducer';
import { LoginService } from './login.service';

export const CANVAS_QR_CODE_REF_ID = 'canvasQRCodeRef';

@Injectable()
export class MaiarAppLoginService implements LoginService {
  bridgeUrl: string;
  qrCodeDrawTimer = 0;
  provider: WalletConnectProvider;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private authStore: Store<AuthState>
  ) {
    this.bridgeUrl = this.appConfig.walletConnectBridgeUrl;
    const callbacks = {
      onClientLogin: async () => {
        const address = await this.provider.getAddress();
        const authEntity: AuthEntity = {
          address,
        };
        this.authStore.dispatch(loginSuccess({ authEntity }));
      },
      onClientLogout: async () => {
        this.authStore.dispatch(logout());
      },
    };
    this.provider = new WalletConnectProvider(this.bridgeUrl, callbacks);
  }
  async login(): Promise<string> {
    return await this.onConnectMaiarApp();
  }

  async logout(): Promise<void> {
    await this.provider.logout();
  }

  private async onConnectMaiarApp(): Promise<string> {
    const connectorUri = await this.provider.login();
    return await QRCode.toString(connectorUri, { type: 'svg' });
  }
}
