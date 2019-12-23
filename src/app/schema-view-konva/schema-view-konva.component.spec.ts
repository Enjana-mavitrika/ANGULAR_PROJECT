import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaViewKonvaComponent } from './schema-view-konva.component';

describe('SchemaViewKonvaComponent', () => {
  let component: SchemaViewKonvaComponent;
  let fixture: ComponentFixture<SchemaViewKonvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaViewKonvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaViewKonvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
