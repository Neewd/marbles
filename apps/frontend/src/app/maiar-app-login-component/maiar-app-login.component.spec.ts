import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaiarAppLoginComponent } from './maiar-app-login.component';

describe('MaiarAppLoginComponentComponent', () => {
  let component: MaiarAppLoginComponent;
  let fixture: ComponentFixture<MaiarAppLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaiarAppLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaiarAppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
