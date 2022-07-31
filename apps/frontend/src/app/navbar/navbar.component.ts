import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AuthEntity,
  AuthState,
  getAuthEntity,
  getIsAuthenticated,
} from '@marbles/auth';
import { ModalService, ModalState, openModal } from '@marbles/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'em-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('connectWalletModalTemplate')
  connectWalletModalTemplate!: TemplateRef<HTMLElement>;

  authEntity$: Observable<AuthEntity>;
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

  async onConnectWallet(): Promise<void> {
    this.modalService.templateRef = this.connectWalletModalTemplate;
    this.modalStore.dispatch(openModal());
  }
}
