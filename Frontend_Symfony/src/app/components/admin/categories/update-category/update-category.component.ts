import { Component, OnInit, ViewChild } from '@angular/core';
import {MDBModalRef} from "../../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.options";
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  @ViewChild('f',{static: false}) editCategoryForm: NgForm;
  categoryToUpdate: Category;
  content: Category;
  constructor(public updateCategoryRef: MDBModalRef, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoryToUpdate = this.content;
  }

  onSubmit(): void {
    this.categoryToUpdate.nomCategory = this.editCategoryForm.value.nomCategory;
    var formdata : any = new FormData();
    formdata.append("nomCategory", this.categoryToUpdate.nomCategory);
    this.categoriesService.updateCategory(this.categoryToUpdate,formdata).subscribe(
      ()=>{
        this.updateCategoryRef.hide();
        this.editCategoryForm.reset();
        //this.categoriesService.categoryUpdatedEvent.emit(this.categoryToUpdate);
        this.categoriesService.categoryWasUpdated.next(true);
    });
  }
}
