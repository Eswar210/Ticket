import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeedashboard',
  standalone: false,
  templateUrl: './employeedashboard.component.html',
  styleUrl: './employeedashboard.component.css'
})
export class EmployeedashboardComponent {
  isCollapsed = false;
  hoveredIndex = -1;
  username:any;user:any;
    constructor(private router:Router){}

    ngOnInit(){
    this.user = sessionStorage.getItem('loggedin');
      this.user=JSON.parse(this.user);
      this.username=this.user.username;
      if(this.user == null){
        this.router.navigateByUrl('/login');
      }
      else{
        this.username = this.user.username;
        console.log(this.username)
      }
    }

 
    menuItems = [
      { name: 'Dashboard', icon: 'fa fa-home', route: '/emp/home' },
      { name: 'Incident', icon: 'fa fa-exclamation-circle', route: '/emp/incident' },
      { name: 'Change Request', icon: 'fa fa-edit', route: '/emp/change' },
      { name: 'Logout', icon: 'fa fa-sign-out', route: '/' }
    ];
    
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


}
