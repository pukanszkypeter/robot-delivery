import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreedyTestConfigurationComponent } from './greedy-test-configuration.component';

describe('GreedyTestConfigurationComponent', () => {
  let component: GreedyTestConfigurationComponent;
  let fixture: ComponentFixture<GreedyTestConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreedyTestConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreedyTestConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
