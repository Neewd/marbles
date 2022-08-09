import { Inject, Injectable } from '@angular/core';
import { HWProvider } from "@elrondnetwork/erdjs-hw-provider";
import { APP_CONFIG } from '@marbles/app-config';
import { Store } from '@ngrx/store';
import { AuthState } from '../+state/auth/auth.reducer';
import { LoginService } from './login.service';

@Injectable()
export class MaiarLedgerLoginService implements LoginService {
  addresses: string[] = [];
  provider: HWProvider;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private authStore: Store<AuthState>
  ) {
    this.provider = new HWProvider();
  }

  async getAddresses(): Promise<string[] | null> {
    try {
      await this.provider.init();
    } catch(err) {
      return null;
    }
    this.addresses = await this.provider.getAccounts();
    return this.addresses;
  }

  async login(address: string): Promise<string> {
    const chosenAddressIndex = this.addresses.findIndex(currentAddress => currentAddress === address);
    await this.provider.login({ addressIndex: chosenAddressIndex });
    return await this.provider.getAddress();
  }

  async logout(): Promise<void> {
    // Not supported by Ledger API
  }
}
