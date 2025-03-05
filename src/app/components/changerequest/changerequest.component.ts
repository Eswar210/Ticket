import { Component, ChangeDetectionStrategy } from '@angular/core'; // Import ChangeDetectionStrategy
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangerequestService } from '../../services/changerequest.service';
import { Title } from 'chart.js';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-changerequest',
  standalone: false,
  templateUrl: './changerequest.component.html',
  styleUrls: ['./changerequest.component.css'], // Corrected styleUrls
  changeDetection: ChangeDetectionStrategy.OnPush, // Using the imported ChangeDetectionStrategy
})
export class ChangerequestComponent {
  changeRequestForm: FormGroup;
  changeRequests: any[] = [];
  userId: string;
  user: any;
  set:number=0;

  constructor(
    public fb: FormBuilder,
    public changeRequestService: ChangerequestService
  ) {
    this.userId = JSON.parse(sessionStorage.getItem('loggedin') || '{}').id;

    this.changeRequestForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      urgency: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      category: ['', Validators.required], // ✅ Added category field

      tasks: this.fb.array([]) // Array of tasks
    });
  }

  ngOnInit() {
    this.user = sessionStorage.getItem('loggedin');
    
    if (this.user) {
      try {
        this.user = JSON.parse(this.user);
        this.userId = this.user.id;
      } catch (e) {
        console.error("Error parsing user data from sessionStorage:", e);
        return; // Prevent the function from running if parsing fails
      }
    }
  
    console.log("User ID:", this.userId); // Debugging log
  
    if (this.userId) {
      this.loadChangeRequests();
      
    } else {
      console.error("User ID is missing, skipping API call.");
    }

  }
  

  // Fetch Change Requests
  loadChangeRequests() {
    this.changeRequestService.getUserChangeRequests(this.userId).subscribe(
      (res: any) => {
        console.log("API Response:", res);  // ✅ Check response data
        this.changeRequests = res;
        console.log("Change Requests:", this.changeRequests.length);
        if(this.changeRequests.length>0){this.set=1}

      },
      (error) => {
        console.error("Error fetching Change Requests:", error);
      }
    );
  }
  
  
  // Get tasks form array
  get tasks(): FormArray {
    return this.changeRequestForm.get('tasks') as FormArray;
  }

  // Add a new task
  addTask(): void {
    const taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      category: ['', Validators.required], // ✅ Added category field

    });

    this.tasks.push(taskForm);
  }

  // Remove a task by index
  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  // Submit the form
  onSubmit(event: Event): void {
    event.preventDefault();

    

    const formData = { ...this.changeRequestForm.value, createdBy: this.userId };

    this.changeRequestService.createChangeRequest(formData).subscribe(
      (res) => {
        alert('Change Request created successfully!');
        this.loadChangeRequests();
        this.changeRequestForm.reset();
        this.tasks.clear();
      },
      (error) => {
        console.error('Error creating Change Request:', error);
        alert('Failed to create Change Request.');
      }
    );
  }
}