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
import { StripeService } from '../stripe/stripe.service';

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
  constructor(private stripeService: StripeService){
    // Listen to value changes
    this.myForm.valueChanges.subscribe(formValues => {
      let basePrice =  (formValues.friday ?? 0 ) * 2000 + (formValues.saturday ?? 0 )*2000;
      if (formValues.organizer && formValues.organizer === 'yes'){
        basePrice = 0
      }
      this.price = basePrice
    });
  }
  price = 0
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    mass: new FormControl('', []),
    date: new FormControl(null, [
      Validators.required,
      minAgeValidator(14),
    ]),
    vehicle: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    friday: new FormControl(0, []),
    saturday: new FormControl(0, []),
  });

  onSubmit() {
    console.warn(this.myForm.value);
    if (this.price > 0){
      this.stripeService.checkout(this.price)
    }
    else {
      
    }
  }
}
