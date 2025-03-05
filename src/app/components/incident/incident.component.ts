import { Component } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident',
  standalone: false,
  templateUrl: './incident.component.html',
  styleUrl: './incident.component.css'
})
export class IncidentComponent {
  incidents: any[] = [];
  userId: string = ''; // Set this from sessionStorage
  title: string = '';
  description: string = '';
  priority: string = 'Low';
  status: string = 'Open';
  createdBy: string = '';
  category:string='';
  comments:string='';
  id :string='';
  len :string='';
  expandedIncident: number | null = null; 
  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    const loggedInUser = sessionStorage.getItem('loggedin');
    if (loggedInUser) {
      this.userId = JSON.parse(loggedInUser).id;
      console.log("User ID:", this.userId); // Debugging log
  
      if (this.userId) {
        this.fetchUserIncidents();
      } else {
        console.error("User ID is missing in session storage.");
      }
    } else {
      console.error("No user information found in session storage.");
    }
  }
  
  fetchUserIncidents(): void {
    if (!this.userId) {
      console.error("Cannot fetch incidents: User ID is null");
      return;
    }
    
    this.incidentService.getUserIncidents(this.userId).subscribe((Res:any)=>{
      this.incidents=Res
      console.log(this.incidents)
    })
   
  }
  // ngDoCheck(){
  //   this.fetchUserIncidents();

  // }

  toggleComments(incident: any) {
    this.expandedIncident = this.expandedIncident === incident ? null : incident;
    console.log(this.expandedIncident)
  }
  createIncident() {
    console.log(this.title);
    const user = sessionStorage.getItem('loggedin'); // Get stored user data
    if (user) {
      this.createdBy = JSON.parse(user).id; // Parse JSON and extract 'id'
    }
  
    const incidentData = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      createdBy: this.createdBy, // Fetch user ID from session storage
      category: this.category,
      comments: this.comments
    };
  
    console.log(incidentData);
  
    // Show first loading message
    Swal.fire({
      title: 'Creating Incident...',
      html: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    setTimeout(() => {
      // Update loading message after 3 seconds
      Swal.update({
        title: 'Sending notification to support member...',
        html: 'Please hold on while we notify the support team.'
      });
    }, 1000);
   
  
    this.incidentService.createIncident(incidentData).subscribe(
      (response) => {
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Incident Created!',
            text: 'Your incident has been successfully logged and the support team has been notified.',
          });
        }, 2000); // Show success message after a delay
        this.fetchUserIncidents;
        console.log(response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while creating the incident. Please try again!',
        });
        console.error('Error creating incident:', error);
      }
    );
  }
  

}
