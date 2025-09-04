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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit{
  loading = false;
  shirtPrice = 2600
  gallerPrice = 3800
  shirtidx = 0;
  shirts: Array<{idx: number, color: string, size: string, galler: string, gender: string}> = []
  constructor(private stripeService: StripeService, private dataService: DataService, private router: Router){}
  ngOnInit(): void {
    this.shirt?.valueChanges.subscribe(value=>{
      if (value === 'no'){
        this.shirts.forEach(shirt=>{
          this.myForm.removeControl('size'+shirt.idx)
          this.myForm.removeControl('color'+shirt.idx)
          this.myForm.removeControl('galler'+shirt.idx)
          this.myForm.removeControl('gender'+shirt.idx)

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
      let addedShirtsPrice = 0
      if (formValues.shirt === 'yes') { //HA KELL NEKI PÓLÓ
        console.log();
        Object.keys(formValues).filter(v=>{return v.includes('galler')}).forEach(key=>{
          if (formValues[`${key}`] === 'yes'){
            addedShirtsPrice += this.gallerPrice
          }
          if (formValues[`${key}`] === 'no'){
            addedShirtsPrice += this.shirtPrice
          }
          if (formValues[`${key}`] === ''){
            addedShirtsPrice += this.shirtPrice
          }
        })
      }
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
        this.stripeService.checkout(this.price, docRef.id, finalData.name, finalData.email)
      }
      else {
        this.dataService.sendEmail({to: [this.email], message: {subject: 'Sikeres regisztráció - Ifjúsági Csendes Napok (Október 24.)', text:`Kedves ${this.name}!

Köszönjük, hogy regisztráltál az Ifjúsági Csendes Napokra!  
Örömmel várunk Téged 2025. október 24-én, hogy együtt tölthessünk két áldott, közösségi napot.

Helyszín: Berettyóújfalu
Érkezés: 7:45
Programkezdés: 8:00

Ha bármi kérdésed van, nyugodtan írj nekünk: szoboszlai.zoltan80@gmail.com
Várjuk, hogy találkozhassunk Veled!

Isten áldásával,  
Az Ifjúsági Csendes Napok szervezői`}})
        this.router.navigate(['/success'])
      }
    })
  }
  addShirt(){
    this.shirts.push({size:'', color:'',galler:'',gender:'', idx: this.shirtidx})
    this.myForm.addControl('size' + this.shirtidx, new FormControl('', [Validators.required]));
    this.myForm.addControl('color' + this.shirtidx, new FormControl('', [Validators.required]));
    this.myForm.addControl('galler' + this.shirtidx, new FormControl('', [Validators.required]));
    this.myForm.addControl('gender' + this.shirtidx, new FormControl('', [Validators.required]));
    this.shirtidx++
  }
  removeShirt(idx: number){
    const rmIdx = this.shirts.findIndex(shirt => shirt.idx === idx)
    this.shirts.splice(rmIdx, 1)
    this.myForm.removeControl('size'+idx)
    this.myForm.removeControl('color'+idx)
    this.myForm.removeControl('galler'+idx)
    this.myForm.removeControl('gender'+idx)

  }
  get shirt() {
    return this.myForm.get('shirt');
  }
  get email() {
    return this.myForm.get('email')!.value;
  }
  get name(){
    return this.myForm.get('name')!.value
  }
}
