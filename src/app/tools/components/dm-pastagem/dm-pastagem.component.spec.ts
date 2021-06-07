import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmPastagemComponent } from './dm-pastagem.component';

describe('DmPastagemComponent', () => {
  let component: DmPastagemComponent;
  let fixture: ComponentFixture<DmPastagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmPastagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmPastagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
