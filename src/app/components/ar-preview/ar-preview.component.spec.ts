import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArPreviewComponent } from './ar-preview.component';

describe('ArPreviewComponent', () => {
  let component: ArPreviewComponent;
  let fixture: ComponentFixture<ArPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArPreviewComponent]
    });
    fixture = TestBed.createComponent(ArPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
