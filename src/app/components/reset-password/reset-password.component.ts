import { Component, OnInit } from '@angular/core';
import { validateEmail } from 'src/util/validateEmail';
import { UsuarioService } from '../../services/usuario.service';
import { getErrorMessage } from '../../../util/error';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  public step!: number;
  public email = '';
  public msg_error: string = '';
  public show: boolean = false;

  ngOnInit(): void {
    this.usuarioService.verificationAccountStep$
      .subscribe({
        next: response => this.step = response
      })
  }

  validarCuenta(e: Event) {
    e.preventDefault();

    this.msg_error = this.obtenerMensajeError();

    if (!this.msg_error) {
      this.usuarioService.validarCuenta(this.email)
        .subscribe({
          next: response => {
            this.usuarioService.setAlert({
              class: "alert alert-success d-flex align-items-center",
              message: response.message
            });
            this.show = true;
            setTimeout(() => {
              this.show = false;
              this.usuarioService.setVerificationStep(2);
              this.usuarioService.setCurrentEmail(this.email);
            }, 3000)
          },
          error: err => {
            const error = getErrorMessage(err);
            this.usuarioService.setAlert({
              class: "alert alert-danger d-flex align-items-center",
              message: error
            });
            this.show = true;

            setTimeout(() => {
              this.show = false;
            }, 3000)
          }
        })
    }
  }

  obtenerMensajeError() {
    if (!validateEmail(this.email)) {
      return 'Correo electrónico inválido';
    } else {
      return '';
    }
  }
}
