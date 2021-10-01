import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RifflerFilterComponent } from './riffler-filter.component';

describe('RifflerFilterComponent', () => {
  let component: RifflerFilterComponent;
  let fixture: ComponentFixture<RifflerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RifflerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RifflerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
