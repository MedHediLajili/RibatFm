import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Comment } from 'src/app/models/comment';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'comment','createdat','article','actions'];
  dataSource: MatTableDataSource<Comment>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  comments: Comment[];
  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    this.commentsService.getAllComments().subscribe(
      (data: Comment[]) =>{
        this.comments = data ;
        this.dataSource = new MatTableDataSource(this.comments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id: string): void{
    this.commentsService.deleteComment(id).subscribe(
      ()=> {
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getComments();
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
