import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-greedy-test-configuration',
  templateUrl: './greedy-test-configuration.component.html',
  styleUrls: ['./greedy-test-configuration.component.scss']
})
export class GreedyTestConfigurationComponent implements OnInit {

  greedyTestConfiguration: FormGroup;

  constructor(private dialogRef: MatDialogRef<GreedyTestConfigurationComponent>,
              private fb: FormBuilder) {
    this.greedyTestConfiguration = this.fb.group({
      node: new FormControl(5, [Validators.required, Validators.min(5), Validators.max(50)]),
      test: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)])
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close({node: this.node.value, test: this.test.value});
  }

  /** Form Controls */

  get node(): FormControl {
    return this.greedyTestConfiguration.get('node') as FormControl;
  }

  get test(): FormControl {
    return this.greedyTestConfiguration.get('test') as FormControl;
  }

}
