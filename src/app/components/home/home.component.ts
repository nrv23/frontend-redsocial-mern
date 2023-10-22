import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { throwError } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { tiposImagen } from '../../../util/genero';
declare var e: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public user?: Usuario;
  public msg_error: string = '';
  public base64_image: string | ArrayBuffer | null = null;

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
      console.log(typeof fileSelected)
      this.msg_error = 'Imagen cargada';
    } else {
      this.msg_error = 'Tamaño máximo de 2 MB. Tipos permitidos (png/jpeg/jpg/gif)';
    }
  }

  removerImagen() {
    this.base64_image = null;
    this.msg_error = "";
  }

  guardarHistoria(usuario: string, image: any) {


  }

}
