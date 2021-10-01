import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RifflerButtonComponent } from './riffler-button.component';

describe('RifflerButtonComponent', () => {
  let component: RifflerButtonComponent;
  let fixture: ComponentFixture<RifflerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RifflerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RifflerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
