import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupRequestComponent } from './signup-request/signup-request.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SignupRequestTableComponent } from './signup-request/signup-request-table/signup-request-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    SignupRequestComponent,
    SignupRequestTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
