import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AuthEntity,
  AuthState,
  getAuthEntity,
  getIsAuthenticated,
  logout,
} from '@marbles/auth';
import { ModalService, ModalState, openModal } from '@marbles/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'em-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [ 
    trigger('AnimationTrigger0', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  @ViewChild('connectWalletModalTemplate')
  connectWalletModalTemplate!: TemplateRef<HTMLElement>;

  authEntity$: Observable<AuthEntity>;
  dropdownOpened: boolean = false;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private modalStore: Store<ModalState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.authEntity$ = this.authStore.select(getAuthEntity);
    this.isAuthenticated$ = this.authStore.select(getIsAuthenticated);
  }

  onConnectWallet(): void {
    this.modalService.templateRef = this.connectWalletModalTemplate;
    this.modalStore.dispatch(openModal());
  }

  onDisconnectWallet(): void {
    this.modalStore.dispatch(logout());
  }

  onToggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }
}
