import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangerequestService } from '../../services/changerequest.service';

@Component({
  selector: 'app-assignedtask',
  standalone: false,
  templateUrl: './assignedtask.component.html',
  styleUrl: './assignedtask.component.css'
})
export class AssignedtaskComponent {
  user: any;
  username: any;
  userid: any;
  allrequests: any = [];
  statusOptions = ["Open", "Assigned", "Pending", "Closed", "InProgress", "Completed"];

  constructor(private router: Router, private service: ChangerequestService, private cdr: ChangeDetectorRef) {}
  selectStatus(task: any, newStatus: string) {
    task.selectedStatus = newStatus; // Temporarily store selected status
  }




  ngOnInit() {
    this.user = sessionStorage.getItem('loggedin');
    this.user = JSON.parse(this.user);
    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else {
      this.username = this.user.username;
      this.userid = this.user.id;
    }

    this.service.gettasks(this.username).subscribe((res: any) => {
      // Ensure each task has a `showDropdown` property for dropdown toggle
      this.allrequests = res.map((task: any) => ({ ...task, showDropdown: false }));
      this.cdr.detectChanges(); // Force Angular to update
    });
  }

  toggleDropdown(taskId: string) {
    this.allrequests = this.allrequests.map((task:any) => ({
      ...task,
      showDropdown: task._id === taskId ? !task.showDropdown : false
    }));
    this.cdr.detectChanges(); // Force UI update
  }

  updateStatus(task: any) {
    task.status = task.selectedStatus;
    task.showDropdown = false;
    this.cdr.detectChanges(); // Ensure UI updates

    // API Call to update status in DB
     this.service.updatestatus(task).subscribe(
      (res) => console.log("Status updated successfully", res),
       (err) => console.error("Error updating status", err)
     );
  }

  trackByTaskId(index: number, task: any) {
    return task._id;
  }
}
