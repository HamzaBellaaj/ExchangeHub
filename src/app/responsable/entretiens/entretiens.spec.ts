import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entretiens } from './entretiens';

describe('Entretiens', () => {
  let component: Entretiens;
  let fixture: ComponentFixture<Entretiens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entretiens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entretiens);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
