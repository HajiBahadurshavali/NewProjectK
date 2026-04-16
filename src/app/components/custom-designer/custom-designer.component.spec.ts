import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignerComponent } from './custom-designer.component';

describe('CustomDesignerComponent', () => {
  let component: CustomDesignerComponent;
  let fixture: ComponentFixture<CustomDesignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDesignerComponent]
    });
    fixture = TestBed.createComponent(CustomDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
