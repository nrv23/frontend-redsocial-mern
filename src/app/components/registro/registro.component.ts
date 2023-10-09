import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from '../../interfaces/IUsuario';
import { getErrorMessage } from '../../../util/error';

declare var passwordStrengthMeter: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  public nivel_contrasena = 0;
  public usuario: IUsuario = {
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    confirm_password: ""
  };

  public msg_error: string = '';

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

  registro(e: Event) {
    e.preventDefault();

    this.msg_error = this.obtenerMensajeError(this.usuario);

    if (!this.msg_error) {

      this.msg_error = '';

      console.log("Se envia el formulario")
      this.usuarioService.registrar(this.usuario)
        .subscribe({
          next: response => {
            console.log(response.data);
          },
          error: err => {
            this.msg_error = getErrorMessage(err);
          },

        })
    }
  }

  obtenerMensajeError(usuario: IUsuario): string {

    if (!usuario.nombre) return "El nombre es requerido";
    else if (!usuario.apellidos) return "Los apelidos son requeridos";
    else if (!usuario.correo) return "El correo es requerido";
    else if (!usuario.password) return "El password es requerido";
    else if (usuario.password.length < 6) return "El password debe contener al menos 6 caracteres";
    else if (!(usuario.password === usuario.confirm_password)) return "Las contraseñas no coinciden";
    else if (this.nivel_contrasena > 3) return "Debe digitar una contraseña mas compleja";
    return "";
  }

}
