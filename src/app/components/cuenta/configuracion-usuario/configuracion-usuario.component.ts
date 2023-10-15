import { Component, OnInit } from '@angular/core';
import { generos } from '../../../../util/genero';
import { IConfiguration } from '../../../interfaces/IConfigation';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrls: ['./configuracion-usuario.component.css']
})
export class ConfiguracionUsuarioComponent implements OnInit {

  constructor(private usuarioSerice: UsuarioService) { }

  public generosList = generos;
  public userConfig!: IConfiguration;


  ngOnInit(): void {
    this.loadConfig()
  }


  loadConfig() {
    this.usuarioSerice.obtenerUsuario()
      .subscribe({
        next: response => {

          let fechaNacimientoStr: string = '';



          let {
            nombre,
            apellidos,
            correo,
            profesion,
            genero,
            username,
            descripcion,
            fechaNacimiento,
            telefono
          } = response.data!;
          console.log(fechaNacimiento)
          if (fechaNacimiento) {
            const d = new Date(fechaNacimiento);
            console.log(d)
            const mes = (Number(d.getMonth() + 1) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
            const dia = ((d.getDate() + 1) < 10) ? '0' + (d.getDate() + 1) : (d.getDate() + 1);
            const anio = d.getFullYear();

            fechaNacimientoStr = anio + '-' + mes + '-' + dia;
          }

          console.log(fechaNacimientoStr)
          this.userConfig = {
            nombre,
            apellidos,
            correo,
            descripcion,
            genero: !genero ? '' : genero,
            profesion,
            username,
            fechaNacimiento: fechaNacimientoStr,
            telefono
          }

          console.log(this.userConfig);
        },
        error: err => {
          console.log(err);
        }
      })
  }

  updateCuenta(e: Event) {
    e.preventDefault();

    this.usuarioSerice.actualizarUsuario(this.userConfig)
      .subscribe({
        next: response => {
          console.log(response)
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
