import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Actualite } from 'src/app/models/actualite';
import { ArticlesService } from 'src/app/services/articles.service';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  displayedColumns: string[] = ['titre','image','datecreation','categorie', 'admin','nbvisiteurs','actions'];
  dataSource: MatTableDataSource<Actualite>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  actualites: Actualite[];
  constructor(private articlesService: ArticlesService) {

  }

  ngOnInit() {
    this.getArticles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getArticles(): void{
    this.articlesService.getAllArticles().subscribe(
      (data: Actualite[]) =>{
        this.actualites = data;
        this.dataSource = new MatTableDataSource(this.actualites);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id: string) {
    this.articlesService.deleteArticle(id).subscribe(
      ()=>{
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getArticles();
    });
  }

}
