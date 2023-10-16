import { Component, OnInit } from '@angular/core';
import { IChangePassword } from '../../interfaces/iChangePassword';
import { UsuarioService } from '../../services/usuario.service';
import { getErrorMessage } from '../../../util/error';
declare var passwordStrengthMeter: any;
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }


  public nivel_contrasena = 0;
  public msg_error: string = '';

  public show: boolean = false;

  public changePassword: IChangePassword = {
    password: "",
    newpassword: "",
    confirm_password: ""
  }

  ngOnInit(): void {

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

  updatePassword(e: Event) {
    e.preventDefault();

    this.msg_error = this.obtenerMensajeError();

    if (!this.msg_error) {
      this.usuarioService.actualizarContrasena(this.changePassword)
        .subscribe({
          next: response => {
            this.show = true;
            this.usuarioService.setAlert({
              class: "alert alert-success d-flex align-items-center",
              message: response.message
            })
            setTimeout(() => {
              this.show = false;
              this.changePassword = {
                password: "",
                newpassword: "",
                confirm_password: ""
              }
            }, 3000)
          },
          error: err => {
            const error = getErrorMessage(err);
            this.show = true;
            this.usuarioService.setAlert({
              class: "alert alert-danger d-flex align-items-center",
              message: error
            })
            setTimeout(() => {
              this.show = false;
            }, 3000)
          }
        })
    }
  }

  obtenerMensajeError() {

    if (!this.changePassword.password) {
      return "Debe ingresar la contraseña actual";
    }
    else if (!this.changePassword.newpassword) {
      return "Debe ingresar una nueva contraseña";
    } else if (!(this.changePassword.newpassword === this.changePassword.newpassword)) {
      return "Las contraseñas no coinciden";

    }

    return "";
  }
}
