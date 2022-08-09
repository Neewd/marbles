import { Component, OnInit } from '@angular/core';
import {
  AuthState,
  CANVAS_QR_CODE_REF_ID,
  getSVGQrCode
} from '@marbles/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'em-maiar-app-login',
  templateUrl: './maiar-app-login.component.html',
  styleUrls: ['./maiar-app-login.component.scss'],
})
export class MaiarAppLoginComponent implements OnInit {
  canvasQrCodeRefId: string = CANVAS_QR_CODE_REF_ID;
  qrCodeDrawTimer: number;
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit(): void {
    this.authStore
      .select(getSVGQrCode)
      .subscribe((svgQRCode) => this.drawQRCodeOnDOM(svgQRCode));
  }

  private drawQRCodeOnDOM(svgString: string): void {
    const canvasQRCodeRef = document.getElementById(CANVAS_QR_CODE_REF_ID);
    if (canvasQRCodeRef) {
      canvasQRCodeRef.innerHTML = svgString;
    } else {
      cancelAnimationFrame(this.qrCodeDrawTimer);
      this.qrCodeDrawTimer = requestAnimationFrame(() =>
        this.drawQRCodeOnDOM(svgString)
      );
    }
  }
}
