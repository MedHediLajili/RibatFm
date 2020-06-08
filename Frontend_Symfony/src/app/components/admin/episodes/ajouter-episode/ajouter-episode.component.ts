import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {UploadFile, UploadInput, UploadOutput} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { PodcastsService } from 'src/app/services/podcasts.service';
import { Podcast } from 'src/app/models/podcast';
import { EpisodesService } from 'src/app/services/episodes.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';


@Component({
  selector: 'app-ajouter-episode',
  templateUrl: './ajouter-episode.component.html',
  styleUrls: ['./ajouter-episode.component.scss']
})
export class AjouterEpisodeComponent implements OnInit {
  @ViewChild('success', { static: true }) success: ModalDirective;
  optionsSelect: Array<any>;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  addEpisodeForm: FormGroup;
  podcasts: Podcast[];
  constructor(private podcastsService: PodcastsService, private episodesService: EpisodesService, private router :Router) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
    this.addEpisodeForm = new FormGroup({
      'nom': new FormControl(null,[Validators.required]),
      'podcast': new FormControl(null,[Validators.required]),
      'invites': new FormControl(null,[Validators.required]),
      'sequence': new FormControl(null,[Validators.required]),
      'sequence_name': new FormControl(null),
    });
    this.getPodcasts();
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

  addNewEpisode(): void {
    /*console.log(this.addEpisodeForm);
    console.log(this.files[0]);*/
    var formdata : any = new FormData();
    formdata.append("nom",this.addEpisodeForm.value.nom);
    formdata.append("invites",this.addEpisodeForm.value.invites);
    formdata.append("sequence",this.files[0].nativeFile);
    this.episodesService.addEpisode(formdata, this.addEpisodeForm.value.podcast).subscribe(
      () => {
        this.success.show();
        setTimeout (() => {
          this.addEpisodeForm.reset();
          this.success.hide();
          this.router.navigate(["/admin/episodes"]);
       }, 3000);
      }
      );
  }


  getPodcasts(): void{
    this.podcastsService.getAllPodcasts().subscribe(
      (data) =>{
        this.podcasts = data;
      }
    );
  }

  init(): void{
    this.addEpisodeForm.reset();
  }

}
