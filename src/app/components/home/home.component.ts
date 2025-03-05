import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangerequestService } from '../../services/changerequest.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  username: any;
  userid: any;
  allrequests: any = []; // ✅ Initialize as an empty array
  allChangeRequests: any = []; // ✅ Initialize as an empty array
  incidencount:any;
  changerequestcount:any;


  constructor(private router: Router, private cdr: ChangeDetectorRef, private changeRequestService: ChangerequestService, private incident:IncidentService,) {}

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels: string[] = ['Closed', 'Completed', 'Pending'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{ data: [0, 0, 0] }]
  };
  public changeRequestChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{ data: [0, 0, 0] }]
  };

  public pieChartType: ChartType = 'pie';

  ngOnInit() {
    this.user = sessionStorage.getItem('loggedin');
    this.user = JSON.parse(this.user);
    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else {
      this.username = this.user.username;
      this.userid = this.user.id;
    }
    // console.log(this.userid)

    this.incident.getUserIncidents(this.userid).subscribe((res: any) => {
      this.allrequests = res.map((task: any) => ({ ...task, showDropdown: false }));

      // ✅ Ensure `this.allrequests` is set before filtering
      const closedCount = this.allrequests.filter((task: any) => task.status === 'Closed').length;
      const completedCount = this.allrequests.filter((task: any) => task.status === 'Resolved').length;
      const pendingCount = this.allrequests.length - (closedCount + completedCount);
      this.incidencount=this.allrequests.length

      // ✅ Update Pie Chart Data inside the API call
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{ data: [closedCount, completedCount, pendingCount] }]
      };

      this.cdr.detectChanges(); // Force Angular to update
    });

    this.changeRequestService.getUserChangeRequests(this.userid).subscribe((res: any) => {
      this.allChangeRequests = res.map((req: any) => ({ ...req, showDropdown: false }));

      const closedCount = this.allChangeRequests.filter((req: any) => req.status === 'Closed').length;
      const completedCount = this.allChangeRequests.filter((req: any) => req.status === 'Completed').length;
      const pendingCount = this.allChangeRequests.length - (closedCount + completedCount);
      this.changerequestcount = this.allChangeRequests.length;

      this.changeRequestChartData = {
        labels: this.pieChartLabels,
        datasets: [{ data: [closedCount, completedCount, pendingCount] }]
      };

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