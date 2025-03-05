import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { ChangerequestService } from '../../services/changerequest.service';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-it-home',
  standalone: false,
  templateUrl: './it-home.component.html',
  styleUrl: './it-home.component.css'
})
export class ItHomeComponent {
  user: any;
  username: string = '';
  userid: string = '';
  allrequests: any[] = []; 
  allChangeRequests: any[] = []; 
  incidencount: number = 0;
  changerequestcount: number = 0;

  public pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public pieChartLabels: string[] = ['Closed', 'Completed', 'Pending'];
  public pieChartData: ChartData<'pie'> = { labels: this.pieChartLabels, datasets: [{ data: [0, 0, 0] }] };
  public changeRequestChartData: ChartData<'pie'> = { labels: this.pieChartLabels, datasets: [{ data: [0, 0, 0] }] };
  public pieChartType: 'pie' = 'pie';

  constructor(
    private router: Router, 
    private cdr: ChangeDetectorRef, 
    private changeRequestService: ChangerequestService, 
    private incidentService: IncidentService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    const loggedInUser = sessionStorage.getItem('loggedin');
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
      this.username = this.user?.username || '';
      this.userid = this.user?.id || '';

      if (this.userid) {
        this.fetchIncidents();
        this.fetchChangeRequests();
      } else {
        console.error('User ID is missing.');
      }
    } else {
      console.error('No user information found.');
      this.router.navigateByUrl('/login');
    }
  }

  fetchIncidents() {
    this.changeRequestService.getIncidentById(this.userid).subscribe((res: any) => {
      this.allrequests = Array.isArray(res) ? res : [];
      this.incidencount = this.allrequests.length;

      const closedCount = this.allrequests.filter(task => task.status === 'Closed').length;
      const completedCount = this.allrequests.filter(task => task.status === 'Resolved').length;
      const pendingCount = this.incidencount - (closedCount + completedCount);

      this.pieChartData = { ...this.pieChartData, datasets: [{ data: [closedCount, completedCount, pendingCount] }] };

      this.cdr.detectChanges();
    });
  }

  fetchChangeRequests() {
    this.changeRequestService.gettasks(this.userid).subscribe((res: any) => {
      this.allChangeRequests = Array.isArray(res) ? res : [];
      this.changerequestcount = this.allChangeRequests.length;

      const closedCount = this.allChangeRequests.filter(req => req.status === 'Closed').length;
      const completedCount = this.allChangeRequests.filter(req => req.status === 'Completed').length;
      const pendingCount = this.changerequestcount - (closedCount + completedCount);

      this.changeRequestChartData = { ...this.changeRequestChartData, datasets: [{ data: [closedCount, completedCount, pendingCount] }] };

      this.cdr.detectChanges();
    });
  }

  scrollToChangeRequests() {
    const element = document.getElementById('cane');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
