import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth/auth.reducer';
import { AuthEffects } from './+state/auth/auth.effects';
import { MaiarAppLoginService } from './services/maiar-app.login.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [MaiarAppLoginService],
})
export class AuthModule {}
