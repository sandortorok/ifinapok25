import { Component, OnInit, inject } from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { combineLatest, startWith } from 'rxjs';
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
    MatProgressSpinnerModule,
  ],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  loading = false;
  shirtPrice = 2600;
  gallerPrice = 3800;
  shirtidx = 0;
  shirts: Array<{
    idx: number;
    color: string;
    size: string;
    galler: string;
    gender: string;
  }> = [];
  constructor(
    private stripeService: StripeService,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.gender?.valueChanges.subscribe((gender) => {
      if (gender === 'boy') {
        this.sem3?.setValue(false);
        this.sem3?.disable({emitEvent:false});
        this.sem2?.enable({emitEvent:false});
      } else if (gender === 'girl') {
        this.sem2?.setValue(false);
        this.sem2?.disable({emitEvent:false});
        this.sem3?.enable({emitEvent:false});
      }
    });
    combineLatest([
      this.sem2!.valueChanges.pipe(startWith(this.sem2!.value)),
      this.sem3!.valueChanges.pipe(startWith(this.sem3!.value)),
      this.sem4!.valueChanges.pipe(startWith(this.sem4!.value)),
      this.sem6!.valueChanges.pipe(startWith(this.sem6!.value)),
      this.sem7!.valueChanges.pipe(startWith(this.sem7!.value)),
    ]).subscribe(([sem2,sem3,sem4,sem6,sem7]) => {
      console.log([sem2,sem3,sem4,sem6,sem7]);
      if (sem2 || sem3){
        this.sem4?.disable({emitEvent:false})
      }
      if (!sem2 && !sem3){
        this.sem4?.enable({emitEvent:false})
      }
      if(sem4){
        this.sem3?.disable({emitEvent:false})
        this.sem2?.disable({emitEvent:false})
      }
      if(!sem4){
        if (this.gender?.value === 'boy'){
          this.sem2?.enable({emitEvent:false})
        }
        if (this.gender?.value === 'girl'){
          this.sem3?.enable({emitEvent:false})
        }
      }
      if (sem6) {
        this.sem7?.disable({emitEvent:false})
      }
      if (!sem6) {
        this.sem7?.enable({emitEvent:false})
      }
      if (sem7) {
        this.sem6?.disable({emitEvent:false})
      }
      if (!sem7) {
        this.sem6?.enable({emitEvent:false})
      }
    });
    this.shirt?.valueChanges.subscribe((value) => {
      if (value === 'no') {
        this.shirts.forEach((shirt) => {
          this.myForm.removeControl('size' + shirt.idx);
          this.myForm.removeControl('color' + shirt.idx);
          this.myForm.removeControl('galler' + shirt.idx);
          this.myForm.removeControl('gender' + shirt.idx);
        });
        this.shirts = [];
      } else if (value === 'yes') {
        this.addShirt();
      }
    });
    this.myForm.valueChanges.subscribe((formValues) => {
      let basePrice =
        (formValues.friday ?? 0) * 2000 + (formValues.saturday ?? 0) * 2000;
      if (formValues.organizer && formValues.organizer === 'yes') {
        basePrice = 0;
      }
      let addedShirtsPrice = 0;
      if (formValues.shirt === 'yes') {
        //HA KELL NEKI PÓLÓ
        console.log();
        Object.keys(formValues)
          .filter((v) => {
            return v.includes('galler');
          })
          .forEach((key) => {
            if (formValues[`${key}`] === 'yes') {
              addedShirtsPrice += this.gallerPrice;
            }
            if (formValues[`${key}`] === 'no') {
              addedShirtsPrice += this.shirtPrice;
            }
            if (formValues[`${key}`] === '') {
              addedShirtsPrice += this.shirtPrice;
            }
          });
      }
      this.price = basePrice + addedShirtsPrice;
    });
  }
  price = 0;
  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    mass: new FormControl('', []),
    date: new FormControl(null, [Validators.required, minAgeValidator(14)]),
    vehicle: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    friday: new FormControl(0, []),
    saturday: new FormControl(0, []),
    sem1: new FormControl(false, []),
    sem2: new FormControl({ value: false, disabled: true }, []),
    sem3: new FormControl({ value: false, disabled: true }, []),
    sem4: new FormControl(false, []),
    sem5: new FormControl(false, []),
    sem6: new FormControl(false, []),
    sem7: new FormControl(false, []),

    shirt: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.warn(this.myForm.value);
    const paid = this.price == 0 ? true : false;
    let finalData = { ...this.myForm.value, paid, price: this.price };
    this.dataService.addItem(finalData).then((docRef) => {
      if (this.price > 0) {
        this.stripeService.checkout(
          this.price,
          docRef.id,
          finalData.name,
          finalData.email
        );
      } else {
        this.dataService.sendEmail({
          to: [this.email],
          message: {
            subject:
              'Sikeres regisztráció - Ifjúsági Csendesnapok (Október 24.)',
            text: `Kedves ${this.name}!

Köszönjük, hogy regisztráltál az Ifjúsági Csendesnapokra!  
Örömmel várunk Téged 2025. október 24-én, hogy együtt tölthessünk két áldott, közösségi napot.

Helyszín: Berettyóújfalu, Bajcsy-Zsilinszky Endre utca 27, 4100
Érkezés: 7:45
Programkezdés: 9:00

Ha bármi kérdésed van, nyugodtan írj nekünk: szoboszlai.zoltan80@gmail.com
Várjuk, hogy találkozhassunk Veled!

Isten áldásával,  
Az Ifjúsági Csendesnapok szervezői`,
          },
        });
        this.router.navigate(['/success']);
      }
    });
  }
  addShirt() {
    this.shirts.push({
      size: '',
      color: '',
      galler: '',
      gender: '',
      idx: this.shirtidx,
    });
    this.myForm.addControl(
      'size' + this.shirtidx,
      new FormControl('', [Validators.required])
    );
    this.myForm.addControl(
      'color' + this.shirtidx,
      new FormControl('', [Validators.required])
    );
    this.myForm.addControl(
      'galler' + this.shirtidx,
      new FormControl('', [Validators.required])
    );
    this.myForm.addControl(
      'gender' + this.shirtidx,
      new FormControl('', [Validators.required])
    );
    this.shirtidx++;
  }
  removeShirt(idx: number) {
    const rmIdx = this.shirts.findIndex((shirt) => shirt.idx === idx);
    this.shirts.splice(rmIdx, 1);
    this.myForm.removeControl('size' + idx);
    this.myForm.removeControl('color' + idx);
    this.myForm.removeControl('galler' + idx);
    this.myForm.removeControl('gender' + idx);
  }
  dialog = inject(MatDialog);
  openDialog(url: string, title: string) {
    this.dialog.open(ShirtDialog, {
      data: {
        url,
        title,
      },
    });
  }
  get shirt() {
    return this.myForm.get('shirt');
  }
  get sem2() {
    return this.myForm.get('sem2');
  }
  get sem3() {
    return this.myForm.get('sem3');
  }
  get sem4() {
    return this.myForm.get('sem4');
  }
  get sem6() {
    return this.myForm.get('sem6');
  }
  get sem7() {
    return this.myForm.get('sem7');
  }
  get gender() {
    return this.myForm.get('gender');
  }
  get email() {
    return this.myForm.get('email')!.value;
  }
  get name() {
    return this.myForm.get('name')!.value;
  }
}

@Component({
  selector: 'shirt-dialog',
  templateUrl: 'shirt-dialog.html',
  imports: [],
})
export class ShirtDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {}
}
