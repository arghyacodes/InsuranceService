import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';

declare var bootstrap: any; // IMPORTANT for Bootstrap modal

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements AfterViewInit {

  isAbove30: boolean | null = null;

  constructor(private router: Router) {}

  // 🔹 Trigger popup when page loads
  ngAfterViewInit(): void {
    setTimeout(() => {
      const modalEl = document.getElementById('ageModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    }, 200); // small delay ensures DOM is ready
  }

  // 🔹 Handle Yes / No
  onAgeChoice(choice: boolean) {
    this.isAbove30 = choice;
    console.log('Age above 30:', choice);

    // Optional: store value for later use
    localStorage.setItem('isAbove30', String(choice));
  }

  careHealth() {
    console.log('Care Health Plan Button Clicked');
    console.log('Above 30:', this.isAbove30);
  }

  goodLife() {
    console.log('Good Life Plan Button Clicked');
    console.log('Above 30:', this.isAbove30);
  }
}
