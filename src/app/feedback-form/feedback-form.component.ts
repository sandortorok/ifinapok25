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
    question: "Milyenek voltak a sportprogramok? 🏐",
    answers: [
      {
        value: '1: Nem vettem részt',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '2: Egyáltalán nem élveztem',
        tellUsWhy: 'Mi volt rossz?',
        placeholder: ''
      },
      {
        value: '3: Inkább nem volt jó',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '4: Jól éreztem magam',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon élveztem, szuper volt! 🎉',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Hogy érezted magad a társasjátékok alatt? ♙",
    answers: [
      {
        value: '1: Nem vettem részt',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '2: Egyáltalán nem élveztem',
        tellUsWhy: 'Mi volt rossz?',
        placeholder: ''
      },
      {
        value: '3: Inkább nem volt jó',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '4: Jól éreztem magam',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon élveztem, szuper volt! 🎉',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Milyennek érezted a szemináriumokat? ✏️",
    answers: [
      {
        value: '1: Nem vettem részt',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '2: Rossz volt',
        tellUsWhy: 'Mi volt rossz?',
        placeholder: ''
      },
      {
        value: '3: Átlagos volt',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '4: Jó volt',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon jól éreztem magam',
        tellUsWhy: 'Egyéb megjegyzés',
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
        placeholder: 'Pl. Jó volt az énekválasztás'
      },
      {
        value: '2: Igen',
        tellUsWhy: 'Milyennek érezted?',
        placeholder: 'Pl. Nagyon felemelőek voltak'
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
    question: "Akadt valami, amit hiányoltál a hirdetésekből? 📣",
    answers: [
      {
        value: '1: Igen, több dolog is hiányzott',
        tellUsWhy: 'Megosztod ezeket velünk?',
        placeholder: ''
      },
      {
        value: '2: Voltak apró hiányosságok 😐',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '3: Nem, minden rendben volt ❌',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },],
    value: undefined,
  },
  {
    question: "Tetszettek az előadások? 📖",
    answers: [
      {
        value: '1: Egyáltalán nem tetszettek',
        tellUsWhy: 'Miért nem tetszett?',
        placeholder: ''
      },
      {
        value: '2: Nem voltak érdekesek',
        tellUsWhy: 'Mi nem tetszett?',
        placeholder: ''
      },
      {
        value: '3: Közepesek, elmentek',
        tellUsWhy: 'Mi ragadt meg bennük?',
        placeholder: ''
      },
      {
        value: '4: Tetszettek, hasznosak voltak',
        tellUsWhy: 'Mi ragadt meg bennük?',
        placeholder: ''
      },
      {
        value: '4: Nagyon tetszettek, rengeteget kaptam belőlük ✨',
        tellUsWhy: 'Mi ragadt meg bennük?',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Milyennek tartottad a bizonyságtételeket?",
    answers: [
      {
        value: '1: Nem igazán szóltak hozzám',
        tellUsWhy: 'Miért nem tetszett?',
        placeholder: ''
      },
      {
        value: '2: Voltak köztük jók, de nem mind',
        tellUsWhy: 'Volt kifogásolni valód?',
        placeholder: ''
      },
      {
        value: '3: Nagyon bátorítóak voltak',
        tellUsWhy: 'Mi volt a legjobban hatással rád?',
        placeholder: ''
      },
      {
        value: '4: Mélyen megérintettek ✨',
        tellUsWhy: 'Mi volt a legjobban hatással rád?',
        placeholder: ''
      },],
    value: undefined,
  },
  {
    question: "Érezted úgy, hogy Isten szól hozzád a 2 nap alatt?",
    answers: [
      {
        value: '1: Igen',
        tellUsWhy: 'Szeretnél valamit megosztani ebből?',
        placeholder: ''
      },
      {
        value: '2: Nem',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },],
    value: undefined,
  },
  {
    question: "Mennyire volt gördülékeny a regisztráció? 📝",
    answers: [
      {
        value: '1: Egyáltalán nem volt gördülékeny',
        tellUsWhy: 'Mi nem volt jó?',
        placeholder: ''
      },
      {
        value: '2: Inkább macerás volt',
        tellUsWhy: 'Mit hiányoltál?',
        placeholder: ''
      },
      {
        value: '3: Közepes, elment',
        tellUsWhy: 'Hiányoltál valamit?',
        placeholder: ''
      },
      {
        value: '4: Egész jól ment',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Szuper könnyű és gyors volt ✨',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Mennyire voltál megelégedve a regisztráció folyamatával? 📝",
    answers: [
      {
        value: '1: Nem voltam megelégedve',
        tellUsWhy: 'Mi nem volt jó?',
        placeholder: ''
      },
      {
        value: '2: Voltak hiányosságok',
        tellUsWhy: 'Mit hiányoltál?',
        placeholder: ''
      },
      {
        value: '3: Közepes, elment',
        tellUsWhy: 'Hiányoltál valamit?',
        placeholder: ''
      },
      {
        value: '4: Elégedett voltam',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon elégedett, minden gördülékenyen',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Meg voltál elégedve a szállásoddal? 🏨",
    answers: [
      {
        value: '1: Egyáltalán nem voltam elégedett',
        tellUsWhy: 'Mi nem volt jó?',
        placeholder: ''
      },
      {
        value: '2: Inkább nem volt jó',
        tellUsWhy: 'Mit hiányoltál?',
        placeholder: ''
      },
      {
        value: '3: Elment',
        tellUsWhy: 'Hiányoltál valamit?',
        placeholder: ''
      },
      {
        value: '4: Elégedett voltam',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon elégedett, szuper volt! 🌟',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Finom volt az ebéd? 🍔",
    answers: [
      {
        value: '1: Nem 🤢',
        tellUsWhy: 'Mi volt a gond?',
        placeholder: ''
      },
      {
        value: '2: Annyira nem 🙁',
        tellUsWhy: 'Mit hiányoltál?',
        placeholder: ''
      },
      {
        value: '3: Elment 😐',
        tellUsWhy: 'Hiányoltál valamit?',
        placeholder: ''
      },
      {
        value: '4: Finom volt 🙂',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon finom volt 😋',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Az ebédelés menetében volt kifogásolni valód? 🍽️",
    answers: [
      {
        value: '1: Igen, több dolog is gondot okozott 😕',
        tellUsWhy: 'Írd le nyugodtan, hogy legközelebb jobban csinálhassuk! ✍️',
        placeholder: ''
      },
      {
        value: '2: Volt egy-két apróság 😐',
        tellUsWhy: 'Írd le nyugodtan, hogy legközelebb jobban csinálhassuk! ✍️',
        placeholder: ''
      },
      {
        value: '3: Nem, minden szuper volt ❌',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Mennyire jött be a tea- és kávéház? ☕",
    answers: [
      {
        value: '1: Egyáltalán nem jött be',
        tellUsWhy: 'Mik voltak ezek?',
        placeholder: ''
      },
      {
        value: '2: Inkább nem volt az igazi',
        tellUsWhy: 'Mit hiányoltál?',
        placeholder: ''
      },
      {
        value: '3: Közepes, elment',
        tellUsWhy: 'Hiányoltál valamit?',
        placeholder: ''
      },
      {
        value: '4: Tetszett, jó volt',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
      {
        value: '5: Nagyon bejött! ✨',
        tellUsWhy: 'Egyéb megjegyzés',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Hogy érezted, mennyire teljesültek az elvárásaid a csendesnapok alatt? 🌿",
    answers: [
      {
        value: '1: Egyáltalán nem teljesültek',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '2: Inkább nem teljesültek',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '3: Közepesen teljesültek',
        tellUsWhy: 'Min változtattál volna?',
        placeholder: ''
      },
      {
        value: '4: Nagyrészt teljesültek',
        tellUsWhy: 'Mi volt különösen jó?',
        placeholder: ''
      },
      {
        value: '5: Teljesen megfeleltek az elvárásaimnak 🌟',
        tellUsWhy: 'Mi volt különösen jó?',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Van valami, amit legközelebb jobban csinálhatnánk? 💡",
    answers: [
      {
        value: '1: Igen',
        tellUsWhy: 'Megosztod velünk?',
        placeholder: ''
      },
      {
        value: '2: Nem',
        tellUsWhy: 'Egyéb hozzászólás',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  {
    question: "Szeretnéd megadni a neved?",
    answers: [
      {
        value: '1: Igen',
        tellUsWhy: 'Neved: ',
        placeholder: 'Pl. Kis Kacsa'
      },
      {
        value: '2: Nem',
        tellUsWhy: '',
        placeholder: ''
      },
    ],
    value: undefined,
  },
  ]
  loading = false;
  feedbackForm: FormGroup = new FormGroup({
    q0: new FormControl(null, [Validators.required]),
    q1: new FormControl(null, [Validators.required]),
    q2: new FormControl(null, [Validators.required]),
    q3: new FormControl(null, [Validators.required]),
    q4: new FormControl(null, [Validators.required]),
    q5: new FormControl(null, [Validators.required]),
    q6: new FormControl(null, [Validators.required]),
    q7: new FormControl(null, [Validators.required]),
    q8: new FormControl(null, [Validators.required]),
    q9: new FormControl(null, [Validators.required]),
    q10: new FormControl(null, [Validators.required]),
    q11: new FormControl(null, [Validators.required]),
    q12: new FormControl(null, [Validators.required]),
    q13: new FormControl(null, [Validators.required]),
    q14: new FormControl(null, [Validators.required]),
    q15: new FormControl(null, [Validators.required]),
    q16: new FormControl(null, [Validators.required]),
    q17: new FormControl(null, [Validators.required]),
    q18: new FormControl(null, [Validators.required]),
    q19: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    console.log(this.feedbackForm.value)
  }
}
