
export interface LoginInfo {
  loginOption: string,
  expires: number,
  loginToken: string,
  signature: string
}

export interface AccountInfo {
  address: string,
  addressIndex: number,
  nonce: number,
  balance: string
}

export interface LoginService {
  login(address?: string): void;

  logout(): void;

}
