import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAdopcionComponent } from './gestion-adopcion.component';

describe('GestionAdopcionComponent', () => {
  let component: GestionAdopcionComponent;
  let fixture: ComponentFixture<GestionAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
