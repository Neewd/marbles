import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  templateRef!: TemplateRef<HTMLElement>;

  constructor() {}

  setTemplate(templateRef: TemplateRef<HTMLElement>) {
    this.templateRef = templateRef;
  }
}
