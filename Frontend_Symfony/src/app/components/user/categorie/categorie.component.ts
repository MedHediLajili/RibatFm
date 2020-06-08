import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/models/actualite';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  articles: Actualite[];
  categorie_id: string;
  categorie: Category;
  constructor(private categoriesService: CategoriesService , private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.categorie_id = params['id'];
        this.getCategorie(this.categorie_id);
      }
    );
  }

  getCategorie(id: string): void {
    this.categoriesService.getCategorie(id).subscribe(
      (data) =>{
        this.categorie = data;
        this.articles = data.actualites;
      }
    );
  }

  onArticle(id: string): void{
    this.router.navigate(["/user/article",id]);
    }

}
