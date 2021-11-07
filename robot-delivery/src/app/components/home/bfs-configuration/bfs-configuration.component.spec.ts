import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfsConfigurationComponent } from './bfs-configuration.component';

describe('BfsConfigurationComponent', () => {
  let component: BfsConfigurationComponent;
  let fixture: ComponentFixture<BfsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfsConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
