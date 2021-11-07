import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bfs-configuration',
  templateUrl: './bfs-configuration.component.html',
  styleUrls: ['./bfs-configuration.component.scss']
})
export class BfsConfigurationComponent implements OnInit {

  bfsConfiguration: FormGroup;

  destinationOptions = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BfsConfigurationComponent>,
              private fb: FormBuilder) {

    this.destinationOptions = data.destinationOptions;

    this.bfsConfiguration = this.fb.group({
      destination: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  run(): void {
    this.dialogRef.close({destination: this.destination.value});
  }

  /** Form Controls */

  get destination(): FormControl {
    return this.bfsConfiguration.get('destination') as FormControl;
  }

}
