import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {UploadFile, UploadInput, UploadOutput, ModalDirective} from "ng-uikit-pro-standard";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';
import { Subscription } from 'rxjs';
import { Podcast } from 'src/app/models/podcast';

@Component({
  selector: 'app-editer-episode',
  templateUrl: './editer-episode.component.html',
  styleUrls: ['./editer-episode.component.scss']
})
export class EditerEpisodeComponent implements OnInit {
  @ViewChild('info', { static: true }) info: ModalDirective;
  formData: FormData;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  editEpisodeForm: FormGroup;
  episodeToUpdate: Episode;
  paramsSubscription: Subscription
  podcasts: Podcast[];
  constructor(private router: Router, private route: ActivatedRoute, private episodesService: EpisodesService,private fb: FormBuilder ) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.createForm();
  }

  ngOnInit() {
    this.getEpisodeToUpdate(this.route.snapshot.params['id']);
    
  }

  createForm(){
    this.editEpisodeForm = this.fb.group({
      'nom': this.fb.control(null,[Validators.required]),
      'invites': this.fb.control(null,[Validators.required]),
      'sequence': this.fb.control(null),
      'sequence_name': this.fb.control(null)
    });
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

  editEpisode(): void{
    /*console.log(this.editEpisodeForm);
    console.log(this.files[0]);*/
    var formdata : any = new FormData();
    formdata.append("nom",this.editEpisodeForm.value.nom);
    formdata.append("invites",this.editEpisodeForm.value.invites);
    if(this.files[0]){
      formdata.append("sequence",this.files[0].nativeFile);
    }
    else{
      formdata.append("sequence",this.episodeToUpdate.sequence.split('/')[1]);
    }
    this.episodesService.updateEpisode(formdata,this.route.snapshot.params['id']).subscribe(
      () =>{
        this.info.show();
        setTimeout (() => {
          this.init();
          this.info.hide();
          this.router.navigate(["/admin/episodes"]);
       }, 2500);
      }
      );
  }

  getEpisodeToUpdate(id: string): any{
    this.episodesService.getEpisode(id).subscribe(
      (data: Episode) =>{
        this.episodeToUpdate = data;
        this.editEpisodeForm.setValue({
          'nom': data.nom,
          "invites": data.invites,
          "sequence":'',
          "sequence_name": data.sequence.substring(data.sequence.lastIndexOf('/') + 1),
        });
      }
    );
  }

  init():void{
    this.editEpisodeForm.reset();
  }

}
