// import {LiveAnnouncer} from '@angular/cdk/a11y';
// import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
// import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
// import {MatTableDataSource, MatTableModule} from '@angular/material/table';
// import { Inventory } from '../../../Models/Inventory.model';
// import { InventoryService } from '../../../Services/Manager/inventory.service';

// @Component({
//   selector: 'app-inventory',
//   templateUrl: './inventory.component.html',
//   styleUrl: './inventory.component.scss'
// })
// export class InventoryComponent implements OnInit, AfterViewInit{
//   constructor(private _liveAnnouncer: LiveAnnouncer) {}

//   displayedColumns: string[] = ['id', 'name', 'stock', 'price'];
//   inventories:Inventory[]=[]
//   dataSource : MatTableDataSource<Inventory>;

//   inventoryService:InventoryService = inject(InventoryService);
  
//   @ViewChild(MatSort) sort: MatSort;
  

//   ngOnInit(){
//     this.getInventories();
    
//   }
//   getInventories(){
//     this.inventoryService.getInventories().subscribe({
//       next:(response)=>{
//         console.log(response.data);
//         this.inventories = response.data as Inventory[];
//         this.dataSource = new MatTableDataSource(this.inventories);

//       },
//       error:(error)=>{
//         console.log(error);
        
//       }
//     })
//   }
//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//   }
//   announceSortChange(sortState: Sort) {
//     console.log(sortState);
    
//     if (sortState.direction) {
//       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this._liveAnnouncer.announce('Sorting cleared');
//     }
//   }
// }























import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from '../../../Models/Inventory.model';
import { InventoryService } from '../../../Services/Manager/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','category', 'stock', 'price','edit','delete'];
  inventories: Inventory[] = [];
  dataSource: MatTableDataSource<Inventory>;

  constructor(
    private inventoryService: InventoryService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getInventories();
  }
  label:string = 'Add Inventory';
  getInventories(): void {
    this.inventoryService.getInventories().subscribe({
      next: (response) => {
        this.inventories = response.data as Inventory[];
        this.dataSource = new MatTableDataSource(this.inventories);
        console.log(this.inventories);
        
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
