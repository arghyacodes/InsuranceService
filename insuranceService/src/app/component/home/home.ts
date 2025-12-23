import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router){}

  browsePlans(){
    console.log('Browse Plans Button Clicked');
    this.router.navigateByUrl('/plans');
  }
}
