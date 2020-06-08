import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-admins',
  templateUrl: './subadmins.component.html',
  styleUrls: ['./subadmins.component.scss']
})
export class SubadminsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom','prenom','email', 'articles','actions'];
  dataSource: MatTableDataSource<Admin>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  subadmins: Admin[];
  constructor(private adminsService: AdminsService) {
    this.dataSource = new MatTableDataSource(this.subadmins);
  }

  ngOnInit() {
  this.getSubAdmins();
  }

  getSubAdmins(): void{
    this.adminsService.getAllSubAdmins().subscribe(
      (data: Admin[]) =>{
        this.subadmins = data;
        this.dataSource = new MatTableDataSource(this.subadmins);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id :string): void{
    this.adminsService.deleteAdmin(id).subscribe(
      ()=> {
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getSubAdmins();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

