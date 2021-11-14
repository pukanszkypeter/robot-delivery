import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotConfigurationComponent } from './robot-configuration.component';

describe('RobotConfigurationComponent', () => {
  let component: RobotConfigurationComponent;
  let fixture: ComponentFixture<RobotConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
