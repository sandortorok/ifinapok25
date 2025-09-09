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
    value: 0,
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
    value: 0,
  }]
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

  }
}
