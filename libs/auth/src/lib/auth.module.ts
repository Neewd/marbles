import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth/auth.effects';
import * as fromAuth from './+state/auth/auth.reducer';
import { AuthService } from './services/auth.service';
import {
  MaiarWebExtensionLoginService,
  MaiarWebWalletLoginService,
  MaiarAppLoginService,
  MaiarLedgerLoginService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    MaiarAppLoginService,
    MaiarWebWalletLoginService,
    MaiarWebExtensionLoginService,
    MaiarLedgerLoginService,
    AuthService,
  ],
})
export class AuthModule {}
