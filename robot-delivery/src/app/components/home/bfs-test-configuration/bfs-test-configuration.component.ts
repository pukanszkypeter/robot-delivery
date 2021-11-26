import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bfs-test-configuration',
  templateUrl: './bfs-test-configuration.component.html',
  styleUrls: ['./bfs-test-configuration.component.scss']
})
export class BfsTestConfigurationComponent implements OnInit {

  treeConfiguration: FormGroup;

  constructor(private dialogRef: MatDialogRef<BfsTestConfigurationComponent>,
              private fb: FormBuilder) {
    this.treeConfiguration = this.fb.group({
      level: new FormControl(2, [Validators.required, Validators.min(2)]),
      child: new FormControl(2, [Validators.required, Validators.min(2)])
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close({level: this.level.value, child: this.child.value});
  }

  /** Form Controls */

  get level(): FormControl {
    return this.treeConfiguration.get('level') as FormControl;
  }

  get child(): FormControl {
    return this.treeConfiguration.get('child') as FormControl;
  }
}
