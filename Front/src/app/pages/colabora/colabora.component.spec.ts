import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboraComponent } from './colabora.component';

describe('ColaboraComponent', () => {
  let component: ColaboraComponent;
  let fixture: ComponentFixture<ColaboraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
