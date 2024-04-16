import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../Models/User.model.ts';
import { UserService } from '../../../../Services/Admin/user.service.js';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../Models/ApiResponse.model.js';

@Component({
  selector: 'app-signup-request-table',
  templateUrl: './signup-request-table.component.html',
  styleUrl: './signup-request-table.component.scss'
})
export class SignupRequestTableComponent implements OnChanges {
  displayedColumns: string[] = ['id', 'name','email', 'phone','date','approvalStatus','action'];
  dataSource: MatTableDataSource<User>;

  @Input() selectedTab: string='';
  users:User[]= [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService:UserService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnChanges(): void {
    if (this.selectedTab) {
      this.selectedTab=='Driver'?this.displayedColumns.splice(4,0,'licenseNumber'):this.displayedColumns.splice(4,1)
      this.fetchDataBasedOnTab();
    }
  }

  fetchDataBasedOnTab(){
    this.fetchPendingUsers().subscribe(
      {
        next:(res)=>{
          this.users= res.data as User[];
          this.dataSource = new MatTableDataSource(this.users);
          console.log(this.users);
    
          this.dataSource.sort = this.sort;
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
  }

  fetchPendingUsers(): Observable<ApiResponse> {
    if (this.selectedTab === 'Manager') {
      return this.userService.getPendingUsersByRole(2)
    } else if (this.selectedTab === 'Driver') {
      return this.userService.getPendingUsersByRole(3)
    }
    return new Observable<ApiResponse>()
  }


  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
