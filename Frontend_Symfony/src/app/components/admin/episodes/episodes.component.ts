import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EpisodesService } from 'src/app/services/episodes.service';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'invites','sequence','datecreation','podcast','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  episodes: any[];
  constructor(private episodesService: EpisodesService) {
  }

  ngOnInit() {
    this.getEpisodes();
  }

  getEpisodes(): void{
    this.episodesService.getAllEpisodes().subscribe(
      (data) =>{
        this.episodes = data;
        this.dataSource = new MatTableDataSource(this.episodes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id: string) {
    this.episodesService.deleteEpisode(id).subscribe(
      ()=>{
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getEpisodes();
    });
  }

  /*onEdit(): void{
  this.router.navigate(["../episode/edit"], {relativeTo: this.route});
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
