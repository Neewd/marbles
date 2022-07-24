import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode';
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { LogLevel } from '@elrondnetwork/erdjs/out';

@Component({
  selector: 'em-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('canvasQRCode') canvasQRCodeRef!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  async onConnectWallet(): Promise<void> {
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
    var svg = new Blob([svgString], { type: 'image/svg+xml' });
    var url = DOMURL.createObjectURL(svg);
    svgImage.onload = () => {
      contextCanvas.drawImage(svgImage, 0, 0);
      DOMURL.revokeObjectURL(url);
    };
    svgImage.src = url;
  }
}
