import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private apiUrl='http://localhost:3333/plans';
  constructor(private http:HttpClient){}
  getAllPlans(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
