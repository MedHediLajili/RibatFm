import {Component, OnInit, ViewChild} from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import {NgForm} from "@angular/forms";
import { MDBModalService } from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.service';
import {MDBModalRef} from "../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.options";
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import {ModalDirective} from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom','articles','actions'];
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('f',{ static: false }) createCategoryForm: NgForm;
  @ViewChild('frame', { static: true }) frame: ModalDirective;
  @ViewChild('success', { static: true }) success: ModalDirective;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  @ViewChild('info', { static: true }) info: ModalDirective;
  updateCategoryRef: MDBModalRef;
  categories: Category[];
  constructor(private modalService: MDBModalService, private categoriesService: CategoriesService) {

    /*this.categoriesService.categoryUpdatedEvent.subscribe(
      () =>{
        this.info.show();
        setTimeout (() => {
          this.info.hide();
       }, 2500);
      }
    );*/
    this.categoriesService.categoryWasUpdated.subscribe(
      (data: boolean) =>{
        if(data){
          this.info.show();
          setTimeout (() => {
            this.info.hide();
         }, 2500);
        }
      }
    );

  }

  ngOnInit() {
  this.getCategories();
  }


  onSubmit(): void {
    var formdata : any = new FormData();
    formdata.append("nomCategory",this.createCategoryForm.value.nomCategory);
    this.categoriesService.addCategory(formdata).subscribe(
      () => {
        this.frame.hide();
        this.getCategories();
        this.createCategoryForm.reset();
        this.success.show();
        setTimeout (() => {
          this.success.hide();
       }, 3000);
      }
    );
  }

  onEdit(category: Category): void {
    this.updateCategoryRef = this.modalService.show(UpdateCategoryComponent,
      {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-dialog-centered',
        containerClass: 'modal-info',
        animated: true,
        data: {
          content: category
      }
    }
    );
  }

  onDeleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(
      ()=>{
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getCategories();
    });

  }

getCategories():void{
  this.categoriesService.getAllCategories().subscribe(
    (data)=>{
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
