import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../../material/material.module';

import { MDBSpinningPreloader } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { ToastModule, ToastService } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { MDBBootstrapModulesPro } from '../../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';

import { AdminComponent } from './admin.component';
import { ToolbarComponent } from './adminmanager/toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from "./login/login.component";
import {ArticlesComponent} from "./articles/articles.component";
import { AdminsComponent } from './adminmanager/admins/admins.component';
import { CategoriesComponent } from './categories/categories.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { SubadminsComponent } from './subadmins/subadmins.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { AjouterArticleComponent } from './articles/ajouter-article/ajouter-article.component';
import { EditerArticleComponent } from './articles/editer-article/editer-article.component';
import { AjouterSubadminComponent } from './subadmins/ajouter-subadmin/ajouter-subadmin.component';
import { EditerEpisodeComponent } from './episodes/editer-episode/editer-episode.component';
import { AjouterEpisodeComponent } from './episodes/ajouter-episode/ajouter-episode.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePodcastComponent } from './podcasts/update-podcast/update-podcast.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { CommentsComponent } from './comments/comments.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AdminComponent,
    ToolbarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    ArticlesComponent,
    AdminsComponent,
    CategoriesComponent,
    EpisodesComponent,
    SubadminsComponent,
    PodcastsComponent,
    AjouterArticleComponent,
    EditerArticleComponent,
    AjouterSubadminComponent,
    EditerEpisodeComponent,
    AjouterEpisodeComponent,
    RegisterComponent,
    UpdatePodcastComponent,
    UpdateCategoryComponent,
    CommentsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    AdminsRoutingModule,
    MaterialModule,
    ChartsModule,
  ],
  providers: [MDBSpinningPreloader, ToastService],
  entryComponents: [
    UpdateCategoryComponent,
    UpdatePodcastComponent,
  ],
  exports: [
    AdminComponent,
    PageNotFoundComponent,
  ],
})
export class AdminModule { }
