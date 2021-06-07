import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePastagemComponent } from './template-pastagem.component';

describe('TemplatePastagemComponent', () => {
  let component: TemplatePastagemComponent;
  let fixture: ComponentFixture<TemplatePastagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePastagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePastagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
