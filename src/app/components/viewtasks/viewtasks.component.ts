import { Component } from '@angular/core';
import { ChangerequestService } from '../../services/changerequest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewtasks',
  standalone: false,
  templateUrl: './viewtasks.component.html',
  styleUrl: './viewtasks.component.css'
})
export class ViewtasksComponent {
  constructor(private service:ChangerequestService){}
  userId:any;
  allTasks:any;
  currentTask: any;
  comment: string = '';
  statusOptions: string[] = ['Pending', 'In Progress', 'Completed'];
  myresult:any;
  updateTask() {
    // Show loading alert
    Swal.fire({
      title: 'Updating Task...',
      html: 'Please wait while we update the task.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const updatedData = {
      status: this.currentTask.status,
      comment: this.comment
    };
  
    this.service.addcomment(this.currentTask._id, updatedData).subscribe(
      (res) => {
        this.myresult = res;
        
        // Show success alert after backend response
        Swal.fire({
          title: 'Success!',
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
          text: 'Failed to update task. Please try again.',
          icon: 'error'
        });
  
        console.error(error);
      }
    );
  }
  

  selecttask(a:any){
    this.currentTask=a;
  }

  ngOnInit(){
    const loggedInUser = sessionStorage.getItem('loggedin');
    if (loggedInUser) {
      this.userId = JSON.parse(loggedInUser).id;
      console.log("User ID:", this.userId); // Debugging log
  
      if (this.userId) {
        this.fetchtasks();
      } else {
        console.error("User ID is missing in session storage.");
      }
    } else {
      console.error("No user information found in session storage.");
    }
  }
  result:any;
  fetchtasks(){
    this.service.gettasks(this.userId).subscribe((res)=>{
      this.result=res;
        if(this.result.message!=null){
          alert(this.result.message)
        }
        else{
          this.allTasks=this.result;
          console.log(this.allTasks)
        }
    })
  }
}
