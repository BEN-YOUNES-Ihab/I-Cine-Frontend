import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsAdminComponent } from './sessions-admin.component';

describe('SessionsAdminComponent', () => {
  let component: SessionsAdminComponent;
  let fixture: ComponentFixture<SessionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
