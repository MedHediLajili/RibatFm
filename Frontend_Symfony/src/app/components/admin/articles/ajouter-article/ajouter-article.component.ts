import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Category } from 'src/app/models/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  addArticleForm: FormGroup;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  selectedFile: File ;
  categories: Category[];
  admin_id: any = localStorage.getItem('user_id');
  @ViewChild('success', { static: true }) success: ModalDirective;
  constructor(private articleService:ArticlesService, private categoriesService: CategoriesService, private router: Router) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
    this.addArticleForm = new FormGroup({
      'titre': new FormControl(null,[Validators.required]),
      'category': new FormControl(null,[Validators.required]),
      'contenu': new FormControl(null,[Validators.required]),
      'image': new FormControl(null,[Validators.required]),
      'image_name': new FormControl(null)
    });
    this.getCategories();

  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }

  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }

  addNewArticle(): void{
    var formdata : any = new FormData();
    formdata.append("titre",this.addArticleForm.value.titre);
    formdata.append("contenu",this.addArticleForm.value.contenu);
    formdata.append("image",this.files[0].nativeFile);
    this.articleService.addArticle(this.admin_id,this.addArticleForm.value.category,formdata).subscribe(
      () =>{
        this.success.show();
        setTimeout (() => {
          this.addArticleForm.reset();
          this.success.hide();
          this.router.navigate(["/admin/articles"]);
       }, 3000);
      }
    );
  }

  init():void{
    this.addArticleForm.reset();
  }

  getCategories():void{
    this.categoriesService.getAllCategories().subscribe(
      (data: Category[])=>{
        this.categories = data;
      }
    );
  }


}
