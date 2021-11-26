import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfsTestConfigurationComponent } from './bfs-test-configuration.component';

describe('BfsTestConfigurationComponent', () => {
  let component: BfsTestConfigurationComponent;
  let fixture: ComponentFixture<BfsTestConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfsTestConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfsTestConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
