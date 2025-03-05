import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ChangerequestService } from '../../services/changerequest.service';

@Component({
  selector: 'app-it-changerequest',
  standalone: false,
  templateUrl: './it-changerequest.component.html',
  styleUrl: './it-changerequest.component.css'
})
export class ItChangerequestComponent {
  allrequests:any;username:any;users:any;
  assignTaskForm: FormGroup;
  selectedTask:any;
  selected(a:any){
    this.selectedTask=a;
  }
  hasPendingTasks(changeRequest: any): boolean {
    return changeRequest.tasks.some((task: any) => task.status !== 'Completed');
}
selectedRequest: any = null;

viewTasks(request: any) {
    this.selectedRequest = request;
}

deleterequest(id:any){
  this.service.deletechange(id).subscribe((res:any)=>{
    alert(res.message);
    this.ngOnInit();
  })

}

assignTask(){
  console.log(this.assignTaskForm.value);
  if (this.assignTaskForm.valid) {
    const { selectedTask, selectedUser } = this.assignTaskForm.value;

  
  

    const payload = {
      requestId: this.selectedTask._id,
      taskId: selectedTask,
      assignedTo: selectedUser
    };

    this.service.assignTask(payload).subscribe((res:any) => {
      alert('Task assigned successfully!');
      
    });
  }
}
   constructor( private fb: FormBuilder,private router:Router,private loginservice:LoginService,private service:ChangerequestService) {
    this.assignTaskForm = this.fb.group({
      selectedTask: ['', Validators.required],
      selectedUser: ['', Validators.required]
    })
   }
  ngOnInit(): void {
    this.loginservice.getAllusers().subscribe((res:any)=>{
      this.users=res;
      console.log(this.users)
    })


    this.service.getChangeRequest().subscribe((res)=>{
      this.allrequests=res;
      console.log(this.allrequests)
    })
    let user = sessionStorage.getItem('loggedin');
    if(user == null){
      this.router.navigateByUrl('/login');
    }
    else{
      this.username = user;
      console.log(this.username)
    }
  }

}
