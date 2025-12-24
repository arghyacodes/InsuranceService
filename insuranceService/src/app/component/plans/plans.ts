import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../../services/plans-service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements AfterViewInit {

  plans: any[] = [];
  selectedPlan: any;
  bookingData: any;
  isAbove30: boolean | null = null;
  finalPrice: number = 0;
  totalPremium:number=0;

  constructor(
    private plansService: PlansService,
    private router: Router
  ) { }

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
    this.finalPrice = this.calculateFinalPrice(plan.baseAmt);
    const modalEl = document.getElementById('planDetailsModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }
  calculateFinalPrice(baseAmt: number):
    number {
    if (this.isAbove30 === true) {
      return baseAmt + 1000;
    }
    return baseAmt;
  }
  buyNow() {

    // Close plan details modal

    const planModal = document.getElementById('planDetailsModal');

    if (planModal) {

      bootstrap.Modal.getInstance(planModal)?.hide();

    }

    // Open booking form modal

    const bookingModal = document.getElementById('bookingModal');

    if (bookingModal) {

      new bootstrap.Modal(bookingModal).show();

    }

  }
submitBooking(formData: any) {

  const years = Number(formData.duration);

  this.totalPremium = this.calculateTotalPremium(years);

  this.bookingData = {

    ...formData,

    planId: this.selectedPlan.planId,

    planName: this.selectedPlan.planName,

    years,

    basePremium: this.finalPrice,

    totalPremium: this.totalPremium

  };

  // Close booking modal

  const bookingModal = document.getElementById('bookingModal');

  bootstrap.Modal.getInstance(bookingModal!)?.hide();

  // Open payment modal

  const paymentModal = document.getElementById('paymentModal');

  new bootstrap.Modal(paymentModal!).show();

}
  processPayment(paymentData: any) {
  const finalPayload = {
    ...this.bookingData,
    paymentFrequency: paymentData.paymentFreq,
    paymentMode: paymentData.paymentMode,
    cardNumber: paymentData.cardNumber,
    paymentStatus: 'SUCCESS'
  };

  console.log('Final Booking Payload:', finalPayload);

  alert('Payment successful! Insurance plan booked.');

  // Later → POST to JSON Server /bookings
}
  calculateTotalPremium(years: number): number {
  let total = this.finalPrice * years;

  if (years === 2) {
    total = total * 0.95; // 5% discount
  } else if (years === 3) {
    total = total * 0.90; // 10% discount
  }

  return Math.round(total);
}
}