import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-success',
  imports: [],
  templateUrl: './policy-success.html',
  styleUrl: './policy-success.css',
})


export class PolicySuccess {

  policyDetails: any;

  constructor() {


    const data = localStorage.getItem('policyDetails');

    if (data) {

      this.policyDetails = JSON.parse(data);

    }

  }

}