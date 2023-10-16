import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { validateVerificationCode } from '../../../util/validateEmail';
import { getErrorMessage } from '../../../util/error';

@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  public email!: string;

  public msg_error: string = '';
  public code: string = '';
  public show: boolean = false;
  ngOnInit(): void {

    this.usuarioService.currentEmail$.subscribe({
      next: email => this.email = email
    })
  }

  validarCodigo(e: Event) {
    e.preventDefault();

    if (!validateVerificationCode(this.code)) this.msg_error = "Código inválido";

    else {
      this.msg_error = '';

      this.usuarioService.validarCodigo(this.code, this.email)
        .subscribe({
          next: () => {
            this.usuarioService.setVerificationStep(3);
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

}
