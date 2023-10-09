import { Component, OnInit } from '@angular/core';
import { ILogin } from '../../interfaces/ILogin';
import { validateEmail } from '../../../util/validateEmail';
import { LoginService } from '../../services/login.service';
import { getErrorMessage } from '../../../util/error';
import { Router } from '@angular/router';
import { save } from 'src/util/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  public loginData: ILogin = {
    correo: "",
    password: ""
  }

  public msg_error: string = '';

  ngOnInit(): void {
  }



  login(e: Event) {

    e.preventDefault();

    if (!validateEmail(this.loginData.correo)) {
      this.msg_error = 'Correo inválido';
      return;
    }

    else if (!this.loginData.password || this.loginData.password.length < 6) {
      this.msg_error = 'Contraseña inválida';
      return;
    }

    this.msg_error = '';

    this.loginData = {
      correo: this.loginData.correo.trim(),
      password: this.loginData.password.trim(),
    };

    this.loginService.login(this.loginData).subscribe({
      next: response => {
        console.log({ response });

        save("token", response.data!.token)
        this.router.navigate(["/home"]);
      },
      error: err => {
        this.msg_error = getErrorMessage(err);
      }
    });
  }
}


