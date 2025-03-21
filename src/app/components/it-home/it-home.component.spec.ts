import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItHomeComponent } from './it-home.component';

describe('ItHomeComponent', () => {
  let component: ItHomeComponent;
  let fixture: ComponentFixture<ItHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
