import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itdashboard',
  standalone: false,
  templateUrl: './itdashboard.component.html',
  styleUrl: './itdashboard.component.css'
})
export class ItdashboardComponent {
  isCollapsed = false;
    hoveredIndex = -1;
    username:any;user:any
      constructor(private router:Router){}
  
      ngOnInit(){
        this.user = sessionStorage.getItem('loggedin');

        if(this.user == null){
          this.router.navigateByUrl('/login');
        }
        else{
          this.user = JSON.parse(this.user);
          this.username = this.user.username;
        
          console.log(this.username)
        }
      }
  
   
      menuItems = [
        { name: 'Dashboard', icon: 'fa fa-home', route: '/it/home' },
        { name: 'View Incident', icon: 'fa fa-exclamation-circle', route: '/it/incident' },
        { name: 'View Task', icon: 'fa fa-list', route: '/it/view' },
        { name: 'Logout', icon: 'fa fa-sign-out', route: '' }
      ];
      
    
  
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  }