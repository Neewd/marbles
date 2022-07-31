import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AuthState,
  getIsAuthenticated,
  getSelectedLoginOption,
  login,
  LoginOption,
} from '@marbles/auth';
import { closeModal } from '@marbles/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'em-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  @ViewChild('modalWrapper') modalWrapper!: ElementRef;

  constructor(private authStore: Store<AuthState>) {}

  currentLoginOption$: Observable<LoginOption>;
  loginOptions: LoginOption[] = [
    {
      id: 'maiarDefiWallet',
      title: 'Maiar DeFi Wallet',
    },
    {
      id: 'maiarApp',
      title: 'Maiar App',
    },
    {
      id: 'ledger',
      title: 'Ledger',
    },
    {
      id: 'maiarWebWallet',
      title: 'Elrond Web Wallet',
    },
  ];

  ngOnInit(): void {
    this.currentLoginOption$ = this.authStore.select(getSelectedLoginOption);
    this.authStore.select(getIsAuthenticated).subscribe((authenticated) => {
      if (authenticated) {
        this.authStore.dispatch(closeModal());
      }
    });
  }

  async onChosenLoginOption(loginOption: LoginOption): Promise<void> {
    this.authStore.dispatch(login({ selectedLoginOption: loginOption }));
  }

  onGoBackButton(): void {
    //this.currentLoginOption = null;
  }
}
