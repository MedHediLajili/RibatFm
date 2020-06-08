import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Actualite } from 'src/app/models/actualite';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  last8news: Actualite[];
  last6news: Actualite[];
  first3news: Actualite[];
  constructor(private router: Router, private articlesService: ArticlesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getLast8News();
    this.getCategories();
    this.getfirst3News();
    this.getLast6News();
  }


  getLast8News(): void{
    this.articlesService.get8Articles().subscribe(
      (data) =>{
        this.last8news = data;
      }
    );
  }
  
  getLast6News(): void{
    this.articlesService.get6Articles().subscribe(
      (data) =>{
        this.last6news = data;
      }
    );
  }

  getfirst3News(): void{
    this.articlesService.getFirst3Articles().subscribe(
      (data) =>{
        this.first3news = data;
      }
    );
  }

  getCategories():void{
    this.categoriesService.getAllCategories().subscribe(
      (data)=>{
        this.categories = data;
      }
    );
  }



  onEdit(id: number): void{
  this.router.navigate(["/user/categorie",id,"edit"]);
  }

}
