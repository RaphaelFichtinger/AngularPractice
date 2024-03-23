
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name!: string;

  addPlayerForm = new FormGroup({
    name: new FormControl("", [Validators.pattern('[a-zA-Z ]+'), Validators.required, Validators.minLength(3)]),
  });


  constructor(
    private dialogRef: MatDialogRef<DialogAddPlayerComponent>,
  ) { };


  onSubmit(): void {
    if (this.addPlayerForm.valid) {
      let value = this.addPlayerForm.get("name")?.value
      if (value && value.length !== 0) {
        this.name = value
        this.dialogRef.close(this.name)
      }
    }
  };


  onNoClick(): void {
    this.name="";
    this.dialogRef.close();
  }


}