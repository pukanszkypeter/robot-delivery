import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bfs-test-configuration',
  templateUrl: './bfs-test-configuration.component.html',
  styleUrls: ['./bfs-test-configuration.component.scss']
})
export class BfsTestConfigurationComponent implements OnInit {

  bfsTestConfiguration: FormGroup;

  constructor(private dialogRef: MatDialogRef<BfsTestConfigurationComponent>,
              private fb: FormBuilder) {
    this.bfsTestConfiguration = this.fb.group({
      level: new FormControl(2, [Validators.required, Validators.min(2)]),
      child: new FormControl(2, [Validators.required, Validators.min(2)]),
      test: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close({level: this.level.value, child: this.child.value, test: this.test.value});
  }

  /** Form Controls */

  get level(): FormControl {
    return this.bfsTestConfiguration.get('level') as FormControl;
  }

  get child(): FormControl {
    return this.bfsTestConfiguration.get('child') as FormControl;
  }

  get test(): FormControl {
    return this.bfsTestConfiguration.get('test') as FormControl;
  }

}
