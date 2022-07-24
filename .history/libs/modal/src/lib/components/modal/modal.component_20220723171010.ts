import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() templateRef!: TemplateRef;
  constructor() {}

  ngOnInit(): void {}
}
