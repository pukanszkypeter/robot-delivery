import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-robot-configuration',
  templateUrl: './robot-configuration.component.html',
  styleUrls: ['./robot-configuration.component.scss']
})
export class RobotConfigurationComponent implements OnInit {

  robotConfiguration: FormGroup;

  path = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RobotConfigurationComponent>,
              private fb: FormBuilder) {

    this.path = data.path;

    this.robotConfiguration = this.fb.group({
      budget: new FormControl(5, [Validators.required, Validators.min(5), Validators.max(20)]),
      weight: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)]),
      location: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close({budget: this.budget.value, weight: this.weight.value, location: this.location.value});
  }

  /** Form Controls */

  get budget(): FormControl {
    return this.robotConfiguration.get('budget') as FormControl;
  }

  get weight(): FormControl {
    return this.robotConfiguration.get('weight') as FormControl;
  }

  get location(): FormControl {
    return this.robotConfiguration.get('location') as FormControl;
  }

}
