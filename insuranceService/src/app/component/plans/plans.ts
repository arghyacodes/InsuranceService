import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../../services/plans-service';

declare var bootstrap: any;

@Component({
  selector: 'app-plans',
  standalone: true,
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements AfterViewInit {

  plans: any[] = [];
  selectedPlan: any;
  isAbove30: boolean | null = null;

  constructor(
    private plansService: PlansService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.loadPlans();
    this.openAgePopup();
  }

  // 🔹 Load plans from JSON server
  loadPlans() {
    this.plansService.getAllPlans().subscribe(data => {
      this.plans = data;
    });
  }

  // 🔹 Open age popup first
  openAgePopup() {
    setTimeout(() => {
      const modalEl = document.getElementById('ageModal');
      if (modalEl) {
        new bootstrap.Modal(modalEl).show();
      }
    }, 300);
  }

  // 🔹 Save age choice
  onAgeChoice(choice: boolean) {
    this.isAbove30 = choice;
    localStorage.setItem('isAbove30', String(choice));
  }

  // 🔹 View more → open plan popup (only AFTER age chosen)
  viewPlan(plan: any) {
    if (this.isAbove30 === null) {
      this.openAgePopup();
      return;
    }

    this.selectedPlan = plan;
    const modalEl = document.getElementById('planDetailsModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  buyNow() {
    console.log('Buying plan:', this.selectedPlan);
    console.log('Age above 30:', this.isAbove30);
    // this.router.navigate(['/payment']);
  }
}