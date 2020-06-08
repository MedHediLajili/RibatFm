import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f',{static:false}) registerForm: NgForm;
  loader: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
      this.loader = true;
      var formdata : any = new FormData();
      formdata.append("email",this.registerForm.value.email);
      formdata.append("nom",this.registerForm.value.nom);
      formdata.append("prenom", this.registerForm.value.prenom);
      formdata.append("motdepasse", this.registerForm.value.password);
      formdata.append("role", 'admin');
      this.authService.signUpAdmin(formdata).subscribe(
        (data) =>{
          this.authService.initializeLocalStorage(data.id,data.nom, data.prenom, data.role);
          this.authService.initializerAdminAuth(data);
          setTimeout (() => {
            this.router.navigateByUrl('/admin');
         }, 2000);
        }
      );
    }
}
