import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  imports: [Navbar, Footer],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  constructor(private router: Router){}

  careHealth(){
    console.log('Care Health Plan Button Clicked');
    // this.router.navigateByUrl('/plans');
  }
  goodLife(){
    console.log('Good Health Plan Button Clicked');
    // this.router.navigateByUrl('/plans');
  }
}
