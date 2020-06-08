import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './adminmanager/admins/admins.component';
import { SubadminsComponent } from './subadmins/subadmins.component';
import { AjouterSubadminComponent } from './subadmins/ajouter-subadmin/ajouter-subadmin.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsComponent } from './comments/comments.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { AjouterEpisodeComponent } from './episodes/ajouter-episode/ajouter-episode.component';
import { EditerEpisodeComponent } from './episodes/editer-episode/editer-episode.component';
import { ArticlesComponent } from './articles/articles.component';
import { AjouterArticleComponent } from './articles/ajouter-article/ajouter-article.component';
import { EditerArticleComponent } from './articles/editer-article/editer-article.component';

const adminsRoutes: Routes = [
    {path: '', redirectTo: 'adminlogin', pathMatch:'full'},
    {path: 'adminlogin', component: LoginComponent},
    {path: 'adminregister', component: RegisterComponent},
    {path: 'admin' , component: AdminComponent ,
      children: [
        {path: 'dashboard' , component: DashboardComponent},
        {path: 'admins' , component: AdminsComponent},
        {path: 'subadmins' , component: SubadminsComponent},
        {path: 'addsubadmin' , component: AjouterSubadminComponent},
        {path: 'categories' , component: CategoriesComponent},
        {path: 'posts' , component: CommentsComponent},
        {path: 'podcasts' , component: PodcastsComponent},
        {path: 'episodes' , component: EpisodesComponent},
        {path: 'addepisode' , component: AjouterEpisodeComponent},
        {path: 'episode/:id/edit' , component: EditerEpisodeComponent},
        {path: 'articles',component: ArticlesComponent},
        {path: 'addarticle' , component: AjouterArticleComponent},
        {path: 'article/:id/edit' , component: EditerArticleComponent},
        {path: '', component: DashboardComponent}
      ]
    },

];

@NgModule({
imports: [RouterModule.forChild(adminsRoutes)],
exports: [RouterModule]
})
export class AdminsRoutingModule {
}