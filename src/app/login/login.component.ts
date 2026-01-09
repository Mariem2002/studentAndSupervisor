import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  login() {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
      .then(() => console.log("Login réussi"))
      .catch(err => console.error("Erreur login :", err));
  }
}
