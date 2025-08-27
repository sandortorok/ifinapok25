import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormComponent } from '../form/form.component';
import { ProgramsComponent } from '../programs/programs.component';

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, FormComponent, ProgramsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
