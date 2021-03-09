import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgHortaComponent } from './prg-horta.component';

describe('PrgHortaComponent', () => {
  let component: PrgHortaComponent;
  let fixture: ComponentFixture<PrgHortaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrgHortaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgHortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
