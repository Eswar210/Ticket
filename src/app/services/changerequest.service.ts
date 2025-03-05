import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangerequestService {

  constructor(private http:HttpClient) { }

  addtochange(obj:any){
      return this.http.post('http://localhost:5000/tickets/changerequests',obj);
  }
  private baseUrl = 'http://localhost:5000/changerequests'; // Adjust API URL as needed

  // Get all Change Requests for a user
  getUserChangeRequests(userId: string){
    return this.http.get('http://localhost:5000/tickets/changerequests/'+userId);
  }

  // Create a new Change Request
  createChangeRequest(data: any){
    return this.http.post('http://localhost:5000/tickets/changerequests', data);
  }

  getChangeRequest(){
    return this.http.get('http://localhost:5000/getchangerequest');
  }
  assignTask(payload: any) {
    return this.http.patch(`http://localhost:5000/assign-task`, payload);
  }

  gettasks(uid:any){
    return this.http.get('http://localhost:5000/tickets/tasks/get/'+uid);
  }

  updatestatus(obj:any){
    return this.http.patch(`http://localhost:5000/update-status/${obj._id}`,obj);
  }

  deletechange(id:any){
    return this.http.delete(`http://localhost:5000/delete-request/${id}`);
  }
  addcomment(uid:any,obj:any){
      return this.http.patch(`http://localhost:5000/tickets/tasks/${uid}`,obj)
  }

  getIncidentById(uid:any){
      return this.http.get(`http://localhost:5000/tickets/getinc/${uid}`)
  }
  updateIncident(uid:any,obj:any){
    return this.http.patch(`http://localhost:5000/tickets/incidents/${uid}`,obj)
  }


}

