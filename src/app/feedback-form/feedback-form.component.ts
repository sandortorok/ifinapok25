import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-feedback-form',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent {
  questions = [{
    question: "Hogy érezted magad a hétvége alatt?",
    answers: [
    { 
      value: '1: Rosszul ☹️', 
      tellUsWhy: 'Mi volt a gond? 😢', 
      placeholder: 'Pl. Nem volt kivel beszélgetni'
    },
    {
      value: '2: Lehetett volna jobb 😕', 
      tellUsWhy: 'Mi volt a gond? 😢', 
      placeholder: 'Pl. Nem volt kivel beszélgetni'
    },
    {
      value: '3: Okésan 😐', 
      tellUsWhy: 'Mi volt a gond? 🤔', 
      placeholder: 'Pl. Nem volt kivel beszélgetni'
    },
    {
      value: '4: Jól 😌', 
      tellUsWhy: 'Mi volt a jó? 😊', 
      placeholder: 'Pl. Sok jó beszélgetésem volt'
    },
        {
      value: '5: Nagyon jól 😊', 
      tellUsWhy: 'Mi volt a jó? 😊', 
      placeholder: 'Pl. Sok jó beszélgetésem volt'
    }
    
    ],
    value: undefined,
  },
  {
    question: "Milyen volt szerinted a szervezés?",
    answers: [
    { 
      value: '1: Rossz ☹️', 
      tellUsWhy: 'Mi nem tetszett? 😢', 
      placeholder: 'Pl. Kevés volt a szabadidő'
    },
    {
      value: '2: Lehetett volna jobb 😕', 
      tellUsWhy: 'Mi nem tetszett? 😢', 
      placeholder: 'Pl. Kevés volt a szabadidő'
    },
    {
      value: '3: Rendben volt 😐', 
      tellUsWhy: 'Mi nem tetszett? 🤔', 
      placeholder: 'Pl. Kevés volt a szabadidő'
    },
    {
      value: '4: Jó volt 😌', 
      tellUsWhy: 'Mi volt a jó? 😊', 
      placeholder: 'Pl. Szépek voltak a szolgálók :)'
    },
    {
      value: '5: Szuper volt 😊', 
      tellUsWhy: 'Mi volt a jó? 😊', 
      placeholder: 'Pl. Szépek voltak a szolgálók :)'
    }
    
    ],
    value: undefined,
  },
{
    question: "Részt vettél sportban? 🏐",
    answers: [
    { 
      value: '1: Nem', 
      tellUsWhy: 'Miért nem?', 
      placeholder: 'Pl. Szemináriumokra mentem'
    },
    {
      value: '2: Igen', 
      tellUsWhy: 'Hogy érezted magad?', 
      placeholder: ''
    },
    
    ],
    value: undefined,
  },
  {
    question: "Be tudtál kapcsolódni a közös éneklésbe? 🎶",
    answers: [
    { 
      value: '1: Nem igazán', 
      tellUsWhy: 'Mi volt az oka?', 
      placeholder: 'Pl. Nem ismerem az énekeket'
    },
    {
      value: '2: Részben', 
      tellUsWhy: 'Milyennek érezted?', 
      placeholder: 'Pl. Nagyon tetszettek az énekek'
    },
    {
      value: '2: Igen', 
      tellUsWhy: 'Milyennek érezted?', 
      placeholder: 'Pl. Nagyon tetszettek az énekek'
    },],
    value: undefined,
  },
  {
    question: "Hol találkoztál a rendezvény hirdetésével? 📣",
    answers: [
    { 
      value: '1: Facebook', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '2: Instagram', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '3: Email', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '4: Barátok', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '5: Korábban is voltam', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '6: Egyéb', 
      tellUsWhy: 'Hol?', 
      placeholder: ''
    },],
    value: undefined,
  },
  {
    question: "Látsz valami hiányosságot a hirdetésekben?",
    answers: [
    { 
      value: '1: Nem', 
      tellUsWhy: 'Egyéb megjegyzés', 
      placeholder: ''
    },
    {
      value: '2: Igen', 
      tellUsWhy: 'Min változtattál volna?', 
      placeholder: ''
    },],
    value: undefined,
  },
  {
    question: "Tetszettek az előadások? 📖",
    answers: [
    { 
      value: '1: Nem jöttek annyira be', 
      tellUsWhy: 'Miért nem tetszett?', 
      placeholder: ''
    },
    {
      value: '2: Kibírtam', 
      tellUsWhy: 'Mi nem tetszett?',
      placeholder: ''
    },
    {
      value: '3: Jók voltak', 
      tellUsWhy: 'Mik ragadtak meg bennük?', 
      placeholder: ''
    },
    {
      value: '4: Nagyon tetszett', 
      tellUsWhy: 'Mik ragadtak meg bennük?', 
      placeholder: ''
    },],
    value: undefined,
  },
  {
    question: "Jók voltak a bizonyságtételek? 📖",
    answers: [
    { 
      value: '1: Nem jöttek annyira be', 
      tellUsWhy: 'Miért nem tetszett?', 
      placeholder: ''
    },
    {
      value: '2: Kibírtam', 
      tellUsWhy: 'Mi nem tetszett?',
      placeholder: ''
    },
    {
      value: '3: Jók voltak', 
      tellUsWhy: 'Mi volt a legjobban hatással rád?',
      placeholder: ''
    },
    {
      value: '4: Nagyon tetszett', 
      tellUsWhy: 'Mi volt a legjobban hatással rád?',
      placeholder: ''
    },],
    value: undefined,
  },


]
  loading = false;
  feedbackForm: FormGroup = new FormGroup({
    q0: new FormControl(0, []),
    q1: new FormControl(0, []),
    q2: new FormControl(0, []),
    q3: new FormControl(0, []),
    q4: new FormControl(0, []),
    q5: new FormControl(0, []),
    q6: new FormControl(0, []),

  });

  onSubmit() {
    console.log(this.feedbackForm.value)
  }
}
