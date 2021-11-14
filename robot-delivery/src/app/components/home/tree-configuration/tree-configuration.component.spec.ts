import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeConfigurationComponent } from './tree-configuration.component';

describe('TreeConfigurationComponent', () => {
  let component: TreeConfigurationComponent;
  let fixture: ComponentFixture<TreeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
