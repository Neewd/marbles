import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AuthState,
  getIsAuthenticated,
  getLoginOptions,
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
  loginOptions$: Observable<LoginOption[]>;

  ngOnInit(): void {
    this.currentLoginOption$ = this.authStore.select(getSelectedLoginOption);
    this.loginOptions$ = this.authStore.select(getLoginOptions);
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
    this.authStore.dispatch(login({ selectedLoginOption: null }));
  }
}
