import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginregisterComponent } from './components/loginregister/loginregister.component';
import { EmployeedashboardComponent } from './components/employeedashboard/employeedashboard.component';
import { HomeComponent } from './components/home/home.component';
import { IncidentComponent } from './components/incident/incident.component';
import { ChangerequestComponent } from './components/changerequest/changerequest.component';
import { AssignedtaskComponent } from './components/assignedtask/assignedtask.component';
import { ItdashboardComponent } from './components/itdashboard/itdashboard.component';
import { ItHomeComponent } from './components/it-home/it-home.component';
import { ItIncidentComponent } from './components/it-incident/it-incident.component';
import { ItChangerequestComponent } from './components/it-changerequest/it-changerequest.component';
import { ViewtasksComponent } from './components/viewtasks/viewtasks.component';

const routes: Routes = [
  {path:'',component:LoginregisterComponent},
  {path:'emp',component:EmployeedashboardComponent,
    children:[
      {path:'home',component:HomeComponent},
      {path:'incident',component:IncidentComponent},
      {path:'change',component:ChangerequestComponent},
      {path:'assigned',component:AssignedtaskComponent}
    ]
  },
  {path:'it',component:ItdashboardComponent,
    children:[
      {path:'home',component:ItHomeComponent},
      {path:'incident',component:ItIncidentComponent},
      {path:'change',component:ItChangerequestComponent},
      {path:'view',component:ViewtasksComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
