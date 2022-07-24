import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalState } from '../../+state/modal/modal.reducer';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() closable!: boolean;
  @Input() templateRef!: TemplateRef<any>;

  constructor(private store: Store<ModalState>) {}

  ngOnInit(): void {}
}
