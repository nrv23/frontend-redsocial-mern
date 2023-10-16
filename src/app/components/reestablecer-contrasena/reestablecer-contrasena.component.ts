import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IChangePassword } from '../../interfaces/iChangePassword';
import { getErrorMessage } from '../../../util/error';
declare var passwordStrengthMeter: any;

@Component({
  selector: 'app-reestablecer-contrasena',
  templateUrl: './reestablecer-contrasena.component.html',
  styleUrls: ['./reestablecer-contrasena.component.css']
})
export class ReestablecerContrasenaComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }
  public data: IChangePassword = {
    newpassword: "",
    confirm_password: ""
  };

  public msg_error: string = '';
  public show: boolean = false;
  public nivel_contrasena = 0;
  private email!: string;

  ngOnInit(): void {
    this.usuarioService.currentEmail$.subscribe({
      next: email => this.email = email
    });

    setTimeout(() => {
      const myPassMeter = passwordStrengthMeter({
        containerElement: '#pswmeter',
        passwordInput: '#psw-input',
        showMessage: true,
        messageContainer: '#pswmeter-message',
        messagesList: [
          'Escribe una contraseña',
          'Muy fácil',
          'Se puede mejorar',
          'Es una buena contraseña',
          'Es una excelente contraseña'
        ],
        height: 8,
        borderRadius: 4,
        pswMinLength: 8,
        colorScore1: '#dc3545',
        colorScore2: '#f7c32e',
        colorScore3: '#4f9ef8',
        colorScore4: '#0cbc87'
      });

      //eventos que obtienen el nivel de la contraseña
      myPassMeter.containerElement.addEventListener("onScore0", () => {
        this.nivel_contrasena = 0;
      })
      myPassMeter.containerElement.addEventListener("onScore1", () => {
        this.nivel_contrasena = 1;
      })
      myPassMeter.containerElement.addEventListener("onScore2", () => {
        this.nivel_contrasena = 2;
      })
      myPassMeter.containerElement.addEventListener("onScore3", () => {
        this.nivel_contrasena = 3;
      })
      myPassMeter.containerElement.addEventListener("onScore4", () => {
        this.nivel_contrasena = 4;
      })

    }, 50);
  }

  reestablecerContrasena(e: Event) {
    e.preventDefault();

    this.msg_error = this.obtenerMensajeError();

    if (!this.msg_error) {
      this.usuarioService.reestablecerContrasena(this.email, this.data.newpassword!)
        .subscribe({
          next: response => {
            this.show = true;
            this.usuarioService.setAlert({
              class: "alert alert-success d-flex align-items-center",
              message: response.message
            })
            setTimeout(() => {
              this.show = false;
              this.data = {
                newpassword: "",
                confirm_password: ""
              }
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

  private obtenerMensajeError() {

    if (!this.data.newpassword) return "Debe ingresar el nuevo password";
    else if (this.data.newpassword !== this.data.confirm_password) return "Las contraseñas no coinciden";
    return "";
  }

}
