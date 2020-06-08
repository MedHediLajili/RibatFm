import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {UploadFile, UploadInput, UploadOutput, ModalDirective} from "ng-uikit-pro-standard";
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { Category } from 'src/app/models/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editer-article',
  templateUrl: './editer-article.component.html',
  styleUrls: ['./editer-article.component.scss']
})
export class EditerArticleComponent implements OnInit {
  @ViewChild('info', { static: true }) info: ModalDirective;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  editArticleForm: FormGroup;
  categories: Category[];
  admin_id: any = localStorage.getItem('user_id');;
  constructor(private fb: FormBuilder, private articlesService:ArticlesService, private route: ActivatedRoute, private router: Router) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.createForm();
  }


  ngOnInit() {
    this.getArticleToUpdate(this.route.snapshot.params['id']);
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

    this.editArticleForm.patchValue({
      'image_name':this.showFiles()
    });
  }

  createForm(){
    this.editArticleForm = this.fb.group({
      'title': this.fb.control(null,[Validators.required]),
      'contenu': this.fb.control(null,[Validators.required]),
      'image': this.fb.control(null),
      'image_name': this.fb.control(null)
    });
  }

  getArticleToUpdate(id: string): any{
    this.articlesService.getArticle(id).subscribe(
      (data) =>{
        this.editArticleForm.setValue({
          'title': data.titre,
          "image":'',
          "contenu": data.contenu,
          "image_name": data.image.substring(data.image.lastIndexOf('/') + 1),
        });
      }
    );
  }

  editArticle(): void {
    /*console.log(this.editArticleForm);*/
    var formdata : any = new FormData();
    formdata.append("titre",this.editArticleForm.value.title);
    formdata.append("contenu",this.editArticleForm.value.contenu);
    if(this.files[0]){
      formdata.append("image",this.files[0].nativeFile);
    }
    this.articlesService.updateArticle(formdata,this.route.snapshot.params['id'], this.admin_id).subscribe(
      () =>{
        this.info.show();
        setTimeout (() => {
          this.init();
          this.info.hide();
          this.router.navigate(["/admin/articles"]);
       }, 2500);
      }
      );
  }

  init():void{
    this.editArticleForm.reset();
  }


}
