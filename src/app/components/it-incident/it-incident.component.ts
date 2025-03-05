import { Component } from '@angular/core';
import { ChangerequestService } from '../../services/changerequest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-it-incident',
  standalone: false,
  templateUrl: './it-incident.component.html',
  styleUrl: './it-incident.component.css'
})
export class ItIncidentComponent {
  userId:any;
  allincidents:any;
  len:any;
  constructor(private service:ChangerequestService){}
  ngOnInit(){
    const loggedInUser = sessionStorage.getItem('loggedin');
    if (loggedInUser) {
      this.userId = JSON.parse(loggedInUser).id;
      console.log("User ID:", this.userId); // Debugging log
  
      if (this.userId) {
        this.fetchincidents();
      } else {
        console.error("User ID is missing in session storage.");
      }
    } else {
      console.error("No user information found in session storage.");
    }
  }
fetchincidents(){ 

    this.service.getIncidentById(this.userId).subscribe((res)=>{
      this.allincidents=res
      console.log(this.allincidents)
      this.len=this.allincidents.length
    })

}

currentIncident: any;
  comment: string = '';
  statusOptions: string[] = ['Pending', 'In Progress', 'Resolved'];

openEditModal(incident: any) {
  this.currentIncident = incident;
  this.comment = ''; 
}
myresult:any;
updateIncident() {
  // Show loading alert
  Swal.fire({
    title: 'Updating...',
    html: 'Please wait while we update the incident.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  const updatedData = {
    status: this.currentIncident.status,
    comment: this.comment
  };

  this.service.updateIncident(this.currentIncident._id, updatedData).subscribe(
    (res) => {
      this.myresult = res;
      
      // Show success alert after backend response
      Swal.fire({
        title: 'Success!Thanks for updating the incident.',
        text: this.myresult.message,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });

      console.log(this.myresult);
    },
    (error) => {
      // Show error alert if the update fails
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update incident. Please try again.',
        icon: 'error'
      });

      console.error(error);
    }
  );
}


}
