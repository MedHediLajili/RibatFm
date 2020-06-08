import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f',{static:false}) loginForm: NgForm;
  loader: boolean = false;
  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit() {

  }

  onSubmit(): void{
    this.loader = true;
    var formdata : any = new FormData();
    formdata.append("email",this.loginForm.value.email);
    formdata.append("motdepasse", this.loginForm.value.password);
    this.authService.signInAdmin(formdata).subscribe(
      (data) => {
        this.authService.initializeLocalStorage(data.id,data.nom, data.prenom, data.role);
        this.authService.initializerAdminAuth(data);
        setTimeout (() => {
          this.router.navigateByUrl('/admin');
       }, 1500);
      }
    );
  }
}
