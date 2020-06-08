import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actualite } from 'src/app/models/actualite';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article_id: string;
  article: Actualite;
  twoarticles: Actualite[];
  constructor(private articlesService: ArticlesService , private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.article_id = params['id'];
        this.getArticle(this.article_id);
      }
    );
  }

  getArticle(id: string): void {
    this.articlesService.getArticle(id).subscribe(
      (data) =>{
        this.article = data;
        this.getTwoArticle(this.article.category.id);
      }
    );
  }

  getTwoArticle(id :string): void {
    this.articlesService.get2ArticlesByCategorie(id).subscribe(
      (data) => {
        this.twoarticles = data;
      }
    );
  }

  onArticle(id: string): void{
    this.router.navigate(["/user/article",id]);
    }

}
