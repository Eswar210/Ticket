import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerequestComponent } from './changerequest.component';

describe('ChangerequestComponent', () => {
  let component: ChangerequestComponent;
  let fixture: ComponentFixture<ChangerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangerequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
