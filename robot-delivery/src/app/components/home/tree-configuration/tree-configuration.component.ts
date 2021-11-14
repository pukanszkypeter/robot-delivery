import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-tree-configuration',
  templateUrl: './tree-configuration.component.html',
  styleUrls: ['./tree-configuration.component.scss']
})
export class TreeConfigurationComponent implements OnInit {

  treeConfiguration: FormGroup;

  constructor(private dialogRef: MatDialogRef<TreeConfigurationComponent>,
              private fb: FormBuilder) {
    this.treeConfiguration = this.fb.group({
      level: new FormControl(2, [Validators.required, Validators.min(2), Validators.max(10)]),
      child: new FormControl(2, [Validators.required, Validators.min(2), Validators.max(5)])
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
