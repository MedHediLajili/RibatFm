import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort  } from '@angular/material';
import {NgForm} from '@angular/forms';
import {Podcast} from '../../../models/podcast';
import {PodcastsService} from '../../../services/podcasts.service';
import {ModalDirective} from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive'
import { MDBModalService } from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.service';
import {MDBModalRef} from "../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.options";
import { UpdatePodcastComponent } from './update-podcast/update-podcast.component';


@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'type', 'episodes', 'actions'];
  dataSource: MatTableDataSource<Podcast>;
  updatePodcastRef: MDBModalRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('f', {static: false}) createPodcastForm: NgForm;
  @ViewChild('frame', { static: true }) frame: ModalDirective;
  @ViewChild('success', { static: true }) success: ModalDirective;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  @ViewChild('info', { static: true }) info: ModalDirective;
  optionsSelect: Array<any>;
  selectedOption: any = {value: '', label: ''};
  podcasts: Podcast [];
  constructor(private podcastsService: PodcastsService, private modalService: MDBModalService) {
    this.podcastsService.podcastWasUpdated.subscribe(
      (data: boolean) =>{
        if(data)
        {
         this.info.show();
          setTimeout (() => {
            this.info.hide();
         }, 3000);
        }
      }
    );
    /*this.podcastsService.podcastUpdatedEvent.subscribe(
      () =>{
        this.info.show();
        setTimeout (() => {
          this.info.hide();
       }, 3000);
      }
    );*/
  }

  ngOnInit() {
   this.getPodcasts();
    this.optionsSelect = [
      { value: '1', label: 'emission' },
      { value: '2', label: 'rubrique' },
    ];
  }

  onEdit(podcast: Podcast) {
    this.updatePodcastRef = this.modalService.show(UpdatePodcastComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog-centered',
      containerClass: 'modal-info',
      animated: true,
      data: {
        content: podcast
    }
  }
  );
  }


  onSubmit(): void {
    var formdata : any = new FormData();
    formdata.append("nomPodcast",this.createPodcastForm.value.nomPodcast);
    formdata.append("typePodcast",this.selectedOption.label);

    this.podcastsService.addPodcast(formdata).subscribe(
      () => {
        this.frame.hide();
        this.getPodcasts();
        this.createPodcastForm.reset();
        this.success.show();
        setTimeout (() => {
          this.success.hide();
       }, 3000);
      }
    );
  }

  onDeletePodcast(id: string) {
    this.podcastsService.deletePodcast(id).subscribe(
      ()=>{
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getPodcasts();
    });
  }

  getPodcasts() {
    this.podcastsService.getAllPodcasts().subscribe(
      (data) => {
        this.podcasts = data;
        this.dataSource = new MatTableDataSource(this.podcasts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  optionSelect(event: any) {
    this.selectedOption = event;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
