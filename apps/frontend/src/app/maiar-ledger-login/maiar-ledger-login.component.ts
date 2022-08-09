import { Component, OnInit } from '@angular/core';
import { AuthState, getLedgerAddresses, maiarLedgerLogin } from '@marbles/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'em-maiar-ledger-login',
  templateUrl: './maiar-ledger-login.component.html',
  styleUrls: ['./maiar-ledger-login.component.scss'],
})
export class MaiarLedgerLoginComponent implements OnInit {
  addresses$: Observable<string[]>;

  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {
    this.addresses$ = this.authStore.select(getLedgerAddresses);
  }

  onLoginAddress(address: string): void {
    this.authStore.dispatch(maiarLedgerLogin({address}));
  }
}
