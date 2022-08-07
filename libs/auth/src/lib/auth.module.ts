import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth/auth.effects';
import * as fromAuth from './+state/auth/auth.reducer';
import { AuthService } from './services/auth.service';
import { MaiarAppLoginService } from './services/maiar-app.login.service';
import { MaiarWebWalletLoginService } from './services/maiar-web-wallet.login.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [MaiarAppLoginService, MaiarWebWalletLoginService, AuthService],
})
export class AuthModule {}
