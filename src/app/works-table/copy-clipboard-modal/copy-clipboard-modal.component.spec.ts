import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyClipboardModalComponent } from './copy-clipboard-modal.component';

describe('CopyClipboardModalComponent', () => {
  let component: CopyClipboardModalComponent;
  let fixture: ComponentFixture<CopyClipboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyClipboardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyClipboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
