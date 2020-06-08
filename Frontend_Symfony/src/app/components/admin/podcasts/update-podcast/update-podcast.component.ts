import { Component, OnInit, ViewChild } from '@angular/core';
import {MDBModalRef} from "../../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.options";
import {NgForm} from "@angular/forms";
import { Podcast } from 'src/app/models/podcast';
import { PodcastsService } from 'src/app/services/podcasts.service';


@Component({
  selector: 'app-update-podcast',
  templateUrl: './update-podcast.component.html',
  styleUrls: ['./update-podcast.component.scss']
})
export class UpdatePodcastComponent implements OnInit {
  @ViewChild('f',{static: false}) editPodcastForm: NgForm;
  optionsSelect: Array<any>;
  selectedValue: string ;
  podcastToUpdate: Podcast;
  content: Podcast;

  constructor(public modalRef: MDBModalRef, private podcastsService: PodcastsService) {}

  ngOnInit() {
    this.podcastToUpdate = this.content;
    if(this.content.typePodcast == "emission"){
      this.optionsSelect = [
        { value: '1', label: 'emission', selected: true },
        { value: '2', label: 'rubrique' },
      ];
      this.selectedValue = '1';
    }
    else {
      this.optionsSelect = [
        { value: '1', label: 'emission'},
        { value: '2', label: 'rubrique', selected: true  },
      ];
      this.selectedValue = '2';
    }
  }

  onSubmit(): void {
    this.podcastToUpdate.nomPodcast = this.editPodcastForm.value.nomPodcast;
    if(this.selectedValue == '2')
    this.podcastToUpdate.typePodcast = 'rubrique';
    else
    this.podcastToUpdate.typePodcast = 'emission';
    var formdata : any = new FormData();
    formdata.append("nomPodcast",this.podcastToUpdate.nomPodcast);
    formdata.append("typePodcast",this.podcastToUpdate.typePodcast);
    this.podcastsService.updatePodcast(this.podcastToUpdate, formdata).subscribe(
      ()=>{
        this.modalRef.hide();
        this.editPodcastForm.reset();
        //this.podcastsService.podcastUpdatedEvent.emit(this.podcastToUpdate);
        this.podcastsService.podcastWasUpdated.next(true);
    });
  }


}
