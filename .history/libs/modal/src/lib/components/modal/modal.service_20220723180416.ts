import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _templateRef!: TemplateRef<HTMLElement>;

  get templateRef() {
    return this._templateRef;
  }

  set templateRef(templateRef: TemplateRef<HTMLElement>) {
    this.templateRef = templateRef;
  }

  constructor() {}
}
