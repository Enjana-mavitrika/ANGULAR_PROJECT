import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMaterialComponent } from './details-material.component';

describe('DetailsMaterialComponent', () => {
  let component: DetailsMaterialComponent;
  let fixture: ComponentFixture<DetailsMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
