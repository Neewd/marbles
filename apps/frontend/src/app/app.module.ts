import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { APP_CONFIG } from '@marbles/app-config';
import { AuthModule } from '@marbles/auth';
import { ModalModule } from '@marbles/modal';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { initApplication } from './app.initializer';
import { GameComponent } from './game/game.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MaiarAppLoginComponent } from './maiar-app-login-component/maiar-app-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddressCropperPipe } from './pipes/address-cropper.pipe';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameComponent,
    LoginModalComponent,
    MaiarAppLoginComponent,
    AddressCropperPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
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
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [[new Inject(Store)]],
    },
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
