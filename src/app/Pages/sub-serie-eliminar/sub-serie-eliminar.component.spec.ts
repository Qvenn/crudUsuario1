import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSerieEliminarComponent } from './sub-serie-eliminar.component';

describe('SubSerieEliminarComponent', () => {
  let component: SubSerieEliminarComponent;
  let fixture: ComponentFixture<SubSerieEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSerieEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSerieEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
