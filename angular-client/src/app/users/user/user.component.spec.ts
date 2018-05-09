import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompleteComponent } from './user-complete.component';

describe('UserCompleteComponent', () => {
  let component: UserCompleteComponent;
  let fixture: ComponentFixture<UserCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
