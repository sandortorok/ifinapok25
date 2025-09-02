import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMobile = window.innerWidth <= 500;
  launchDate:Date = new Date('Sept 4 2025');
  days = '99';
  hours = '99';
  minutes = '99';
  seconds = '99';
  ngOnInit(): void {
    this.countdown()
    setInterval(()=>this.countdown(),1000)
  }
  countdown(){
    // Különbség milliszekundumban
    const diffMs = this.launchDate.getTime() - new Date().getTime();
    // Napok
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    this.days = this.convertTime(days)
    // Órák (maradék nap után)
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.hours = this.convertTime(hours)
    // Percek (maradék óra után)
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    this.minutes = this.convertTime(minutes)
    // Másodpercek (maradék perc után)
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    this.seconds = this.convertTime(seconds)
  }
  isActive = false;
  convertTime(time:number){
    return time < 10 ? '0' + String(time) : String(time);
  }
}
