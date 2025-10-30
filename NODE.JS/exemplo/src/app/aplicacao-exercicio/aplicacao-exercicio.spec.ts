import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaoExercicio } from './aplicacao-exercicio';

describe('AplicacaoExercicio', () => {
  let component: AplicacaoExercicio;
  let fixture: ComponentFixture<AplicacaoExercicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicacaoExercicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AplicacaoExercicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
