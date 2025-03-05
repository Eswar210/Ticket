import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { ChangerequestComponent } from './components/changerequest/changerequest.component';
import { EmployeedashboardComponent } from './components/employeedashboard/employeedashboard.component';
import { HomeComponent } from './components/home/home.component';
import { IncidentComponent } from './components/incident/incident.component';
import { ItChangerequestComponent } from './components/it-changerequest/it-changerequest.component';
import { ItHomeComponent } from './components/it-home/it-home.component';
import { ItIncidentComponent } from './components/it-incident/it-incident.component';
import { ItdashboardComponent } from './components/itdashboard/itdashboard.component';
import { LoginregisterComponent } from './components/loginregister/loginregister.component';
import { ViewtasksComponent } from './components/viewtasks/viewtasks.component';
import { AssignedtaskComponent } from './components/assignedtask/assignedtask.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    ChangerequestComponent,
    EmployeedashboardComponent,
    HomeComponent,
    IncidentComponent,
    ItChangerequestComponent,
    ItHomeComponent,
    ItIncidentComponent,
    ItdashboardComponent,
    LoginregisterComponent,
    ViewtasksComponent,
    AssignedtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

