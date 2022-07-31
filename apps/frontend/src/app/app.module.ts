import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from '@marbles/auth';
import { ModalModule } from '@marbles/modal';
import { GameComponent } from './game/game.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MaiarAppLoginComponent } from './maiar-app-login-component/maiar-app-login.component';
import { APP_CONFIG } from '@marbles/app-config';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameComponent,
    LoginModalComponent,
    MaiarAppLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    ModalModule,
  ],
  providers: [{ provide: APP_CONFIG, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
