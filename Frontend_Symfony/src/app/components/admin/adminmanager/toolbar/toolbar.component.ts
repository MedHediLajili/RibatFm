import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from 'ng-uikit-pro-standard';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: SidenavComponent;
  allowaccess :boolean ;
  admin_prenom: any;
  constructor( private router:Router, private authService: AuthService) { 
    this.admin_prenom = localStorage.getItem('prenom_user');
    this.allowaccess = localStorage.getItem('role_user') == 'admin';
  }

  ngOnInit() {
    
  }

  onLogOut(): void{
    this.authService.logOut();
    this.router.navigate(['/adminlogin']);
  }

  hideSidenavAfterClick() {
    if (window.innerWidth <= 1300) {
      this.sidenav.hide();
    }
  }




}
