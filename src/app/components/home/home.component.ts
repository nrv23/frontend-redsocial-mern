import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { throwError } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { tiposImagen } from '../../../util/genero';
import { HistoriaService } from '../../services/historia.service';
import { getErrorMessage } from '../../../util/error';
import { UsuarioService } from '../../services/usuario.service';
declare var e: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private historyService: HistoriaService,
    private usuarioSerice: UsuarioService) { }

  public user?: Usuario;
  public msg_error: string = '';
  public base64_image: string | ArrayBuffer | null = null;
  private file: any = null;
  public show: boolean = false;
  public userLists: Usuario[] = [];


  ngOnInit(): void {

    this.loginService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.user = user;
        }
      },
      error: err => throwError(err)
    })

    e.tinySlider();
    this.cargarUsuarios();
  }

  cargarImagen(e: any) {
    const fileSelected = e.target.files;
    const imageTypeAllowed: string[] = tiposImagen;
    if (
      fileSelected.length
      && imageTypeAllowed.includes(fileSelected[0].type)
      && fileSelected[0].size <= 2000000
    ) {
      const reader = new FileReader();
      reader.onload = e => this.base64_image = reader.result;
      reader.readAsDataURL(fileSelected[0]);
      this.file = fileSelected[0];

      this.msg_error = 'Imagen cargada';
    } else {
      this.msg_error = 'Tamaño máximo de 2 MB. Tipos permitidos (png/jpeg/jpg/gif)';
    }
  }

  removerImagen() {
    this.base64_image = null;
    this.msg_error = "";
  }

  guardarHistoria() {

    const form = new FormData();
    form.append("image", this.file);

    this.historyService.guardarHistoria(form)
      .subscribe({
        next: response => {

          this.usuarioSerice.setAlert({
            class: "alert alert-success d-flex align-items-center",
            message: response.message
          });
          this.show = true;

          setTimeout(() => {
            this.show = false;
            this.removerImagen()
          }, 3000);

        },
        error: e => {

          this.show = true;
          this.usuarioSerice.setAlert({
            class: "alert alert-danger d-flex align-items-center",
            message: getErrorMessage(e)
          });
          setTimeout(() => {
            this.show = false;
          }, 3000);
        }
      })
  }

  cargarUsuarios() {
    this.usuarioSerice.cargarUsuarios()
      .subscribe({
        next: response => {
          if (response.data) this.userLists = response.data;
          console.log(response.data)
        },
        error: e => {

        }
      })
  }

  enviarInvitacionAmistad(user: Usuario) {
    console.log(user)
    this.usuarioSerice.enviarInvitacionAmistad(user._id!)
      .subscribe({
        next: response => {
          console.log(response);

          this.userLists = this.userLists.filter(el => el._id !== user._id);
        },
        error: e => {

        }
      })
  }
}
