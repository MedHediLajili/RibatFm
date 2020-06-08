import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';


const usersRoutes: Routes = [
    {path: 'user' , component: UserComponent,
    children: [
        {path: 'home' , component: HomeComponent},
        {path: 'categorie/:id/edit' , component: CategorieComponent},
        {path: 'article/:id' , component: ArticleComponent},
        {path: '', component: HomeComponent}
      ] 
    }
];

@NgModule({
imports: [RouterModule.forChild(usersRoutes)],
exports: [RouterModule]
})
export class UsersRoutingModule {
}