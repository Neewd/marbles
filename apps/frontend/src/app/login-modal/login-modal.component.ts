import { Component, OnInit } from '@angular/core';

interface LoginOption {
  id: string;
  title: string;
}

@Component({
  selector: 'em-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  loginOptions: LoginOption[] = [
    {
      id: 'maiarExtension',
      title: 'Maiar Extension',
    },
    {
      id: 'maiarWebWallet',
      title: 'Maiar Web Wallet',
    },
    {
      id: 'ledger',
      title: 'Ledger',
    },
    {
      id: 'maiarApp',
      title: 'Maiar DeFi Connect',
    },
  ];

  currentLoginOptionId!: string;

  onChoseLoginOption(loginOptionId: string): void {
    this.currentLoginOptionId = loginOptionId;
  }
}
