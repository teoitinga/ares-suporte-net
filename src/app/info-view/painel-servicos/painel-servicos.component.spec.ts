import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelServicosComponent } from './painel-servicos.component';

describe('PainelServicosComponent', () => {
  let component: PainelServicosComponent;
  let fixture: ComponentFixture<PainelServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
