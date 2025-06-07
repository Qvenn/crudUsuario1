import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSerieComponent } from './sub-serie.component';

describe('SubSerieComponent', () => {
  let component: SubSerieComponent;
  let fixture: ComponentFixture<SubSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
