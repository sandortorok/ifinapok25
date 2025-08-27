import { Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },      // főoldal → AppComponent
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];