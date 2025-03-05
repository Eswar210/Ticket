import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItChangerequestComponent } from './it-changerequest.component';

describe('ItChangerequestComponent', () => {
  let component: ItChangerequestComponent;
  let fixture: ComponentFixture<ItChangerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItChangerequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItChangerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
