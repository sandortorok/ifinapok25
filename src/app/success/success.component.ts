import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';   // <-- EZ KELL

@Component({
  selector: 'app-success',
  imports: [MatButtonModule,RouterModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {}
