import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { ModalService, ModalState, openModal } from '@marbles/modal';
import * as QRCode from 'qrcode';

@Component({
  selector: 'em-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('canvasQRCode') canvasQRCodeRef!: ElementRef;

  @ViewChild('connectWalletModalTemplate')
  connectWalletModalTemplate!: TemplateRef<HTMLElement>;

  constructor(
    private modalService: ModalService,
    private store: Store<ModalState>
  ) {}

  async onConnectWallet2(): Promise<void> {
    const bridgeUrl = 'https://bridge.walletconnect.org';

    const callbacks = {
      onClientLogin: async function () {
        const address = await provider.getAddress();
        console.log('Address:', address);
      },
      onClientLogout: async function () {
        console.log('onClientLogout()');
      },
    };

    const provider = new WalletConnectProvider(bridgeUrl, callbacks);
    const connectorUri = await provider.login();

    const svgString = await QRCode.toString(connectorUri, { type: 'svg' });
    const contextCanvas = this.canvasQRCodeRef.nativeElement.getContext('2d');
    const DOMURL = window.URL || window.webkitURL || window;
    const svgImage = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);
    svgImage.onload = () => {
      contextCanvas.drawImage(svgImage, 0, 0);
      DOMURL.revokeObjectURL(url);
    };
    svgImage.src = url;
  }

  async onConnectWallet(): Promise<void> {
    this.modalService.templateRef = this.connectWalletModalTemplate;
    this.store.dispatch(openModal());
  }
}
