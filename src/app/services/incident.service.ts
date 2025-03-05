import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:5000'; // Adjust based on your backend URL

  constructor(private http: HttpClient) { }

  // Fetch incidents for a specific user
  getUserIncidents(userId: string) {
  
    return this.http.get('http://localhost:5000/tickets/getincident/'+userId);
  }
  createIncident(incidentData: any){
    console.log('inc servi')
    return this.http.post(`${this.baseUrl}/tickets/create`, incidentData);
  }
}
