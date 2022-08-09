import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaiarLedgerLoginComponent } from './maiar-ledger-login.component';

describe('MaiarLedgerLoginComponent', () => {
  let component: MaiarLedgerLoginComponent;
  let fixture: ComponentFixture<MaiarLedgerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaiarLedgerLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaiarLedgerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
