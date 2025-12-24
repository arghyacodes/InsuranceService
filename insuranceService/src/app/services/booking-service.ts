import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class BookingService {

  private apiUrl = 'http://localhost:3333/bookings';

  constructor(private http: HttpClient) {}

  createBooking(payload: any): Observable<any> {

    return this.http.post(this.apiUrl, payload);

  }

}