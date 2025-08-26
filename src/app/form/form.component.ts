import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { minAgeValidator } from '../validators/age.validator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-form',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  Myform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    mass: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [
      Validators.required,
      minAgeValidator(14),
    ]),
    vehicle: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    friday: new FormControl(0, []),
    saturday: new FormControl(0, []),
  });

  onSubmit() {
    console.warn(this.Myform.value);
    fetch(`${environment.functionsBaseUrl}/helloWorld`).then(res => res.text()).then(console.log);
  }
}
