import { Component, OnInit, signal } from '@angular/core';
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
import { environment } from '../../environments/environment';
import { StripeService } from '../stripe/stripe.service';
import { DataService } from '../data.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Router } from '@angular/router';

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
    MatButtonToggleModule
  ],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit{
  shirtPrice = 2500
  shirtidx = 0;
  shirts: Array<{idx: number, color: string, size: string}> = []
  constructor(private stripeService: StripeService, private dataService: DataService, private router: Router){}
  ngOnInit(): void {
    this.shirt?.valueChanges.subscribe(value=>{
      if (value === 'no'){
        this.shirts.forEach(shirt=>{
          this.myForm.removeControl('size'+shirt.idx)
          this.myForm.removeControl('color'+shirt.idx)
        })
        this.shirts = []
      }
      else if(value === 'yes'){
        this.addShirt()
      }
    })
    this.myForm.valueChanges.subscribe(formValues => {
      let basePrice = (formValues.friday ?? 0 ) * 2000 + (formValues.saturday ?? 0 )*2000;
      if (formValues.organizer && formValues.organizer === 'yes'){
        basePrice = 0
      }
      let addedShirtsPrice = formValues.shirt === 'no' ? 0 : this.shirts.length * this.shirtPrice 
      this.price = basePrice + addedShirtsPrice
    });
  }
  price = 0
  myForm: FormGroup = new FormGroup({
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
    shirt: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.warn(this.myForm.value);
    const paid = this.price == 0 ? true : false
    let finalData = {...this.myForm.value, paid, price: this.price}
    this.dataService.addItem(finalData).then((docRef)=>{
      if (this.price > 0){
        this.stripeService.checkout(this.price, docRef.id)
      }
      else {
        this.router.navigate(['/success'])
      }
    })
  }
  addShirt(){
    this.shirts.push({size:'', color:'', idx: this.shirtidx})
    this.myForm.addControl('size' + this.shirtidx, new FormControl('', [Validators.required]));
    this.myForm.addControl('color' + this.shirtidx, new FormControl('', [Validators.required]));
    this.shirtidx++
  }
  removeShirt(idx: number){
    const rmIdx = this.shirts.findIndex(shirt => shirt.idx === idx)
    this.shirts.splice(rmIdx, 1)
    this.myForm.removeControl('size'+idx)
    this.myForm.removeControl('color'+idx)
  }
  get shirt() {
    return this.myForm.get('shirt');
  }

}
