import { Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },      // főoldal → AppComponent
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];