import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBSpinningPreloader } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { ToastModule, ToastService } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { MDBBootstrapModulesPro } from '../../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';

import { UserComponent } from './user.component';
import { MaterialModule } from '../../material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterUserComponent } from './footer-user/footer-user.component';
import { HomeComponent } from './home/home.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    UserComponent, 
    HeaderComponent, 
    FooterUserComponent, 
    HomeComponent, CategorieComponent, ArticleComponent, 
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    MaterialModule,
    UsersRoutingModule
  ],
  providers: [MDBSpinningPreloader, ToastService],
  exports: [
    UserComponent,
  ],
})
export class UserModule { }
