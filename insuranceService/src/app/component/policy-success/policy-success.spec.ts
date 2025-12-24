import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySuccess } from './policy-success';

describe('PolicySuccess', () => {
  let component: PolicySuccess;
  let fixture: ComponentFixture<PolicySuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicySuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicySuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
