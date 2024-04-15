import { Component, inject } from '@angular/core';
import { CommonService } from '../../Services/Common/common.service';
import { SideNavLink } from '../../Models/NavLink.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  navigationLinks:SideNavLink[] = [
    {path:'dashboard', label: 'Dashboard', icon : '../../../assets/Images/Manager/dashboard_icon_2.png'},
    {path:'warehouse', label: 'warehouses', icon : '../../../assets/Images/Manager/inventory_1.png'},
  ];

  commonService = inject(CommonService);
}
