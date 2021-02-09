import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicarRestaurarComponent } from './replicar-restaurar.component';

describe('ReplicarRestaurarComponent', () => {
  let component: ReplicarRestaurarComponent;
  let fixture: ComponentFixture<ReplicarRestaurarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplicarRestaurarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicarRestaurarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
