import { Injectable } from '@angular/core';
import { LoginOption } from '../+state/auth/login-option.models';
import { AccountInfo, LoginInfo } from './login.service';

const LOGIN_DATA_PERSISTED_KEY = 'marbles-dapp-login';
const ACCOUNT_DATA_PERSISTED_KEY = 'marbles-dapp-account';

@Injectable()
export class AuthService {
  persistLoginData(
    loginOption: LoginOption,
    loginToken: string = '',
    signature: string = ''
  ): void {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const loginInfo: LoginInfo = {
      loginOption: loginOption.id,
      expires: today.getTime(),
      loginToken,
      signature,
    };
    localStorage.setItem(LOGIN_DATA_PERSISTED_KEY, JSON.stringify(loginInfo));
  }

  persistAccountData(
    address: string,
    addressIndex: number = 0,
    balance: string = '',
    nonce: number = 0
  ): void {
    const accountData = {
      address,
      addressIndex,
      balance,
      nonce,
    };
    localStorage.setItem(
      ACCOUNT_DATA_PERSISTED_KEY,
      JSON.stringify(accountData)
    );
  }

  unpersistLoginData(): void {
    localStorage.removeItem(LOGIN_DATA_PERSISTED_KEY);
  }

  unpersistAccountData(): void {
    localStorage.removeItem(ACCOUNT_DATA_PERSISTED_KEY);
  }

  getLoginData(): Promise<LoginInfo | null> {
    return new Promise<LoginInfo | null>((resolve) => {
      const loginInfoJson: string | null = localStorage.getItem(
        LOGIN_DATA_PERSISTED_KEY
      );
      if (loginInfoJson) {
        resolve(JSON.parse(loginInfoJson) as LoginInfo);
      }
      resolve(null);
    });
  }

  getAccountData(): Promise<AccountInfo | null> {
    return new Promise<AccountInfo | null>((resolve) => {
        const accountDataJson: string | null = localStorage.getItem(
            ACCOUNT_DATA_PERSISTED_KEY
          );
          if (accountDataJson) {
            resolve(JSON.parse(accountDataJson) as AccountInfo);
          }
          resolve(null);
    });
  }
}
