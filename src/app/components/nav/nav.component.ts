import { Component, OnInit } from '@angular/core';
import { remove } from '../../../util/storage';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public friendInvitations: Usuario[] = [];

  constructor(
    private usuarioSerice: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarInvitacionesAmistad();
  }

  logout() {
    remove("token");
  }

  cargarInvitacionesAmistad() {
    this.usuarioSerice.obtenerInvitacionesAmistad()
      .subscribe({
        next: response => {
          if (response.data) this.friendInvitations = response.data;
        },
        error: err => {

        }
      })
  }

  aceptarInvitacionAmistad(user: Usuario) {

    this.usuarioSerice.aceptarInvitacionAmistad(user._id!).subscribe({
      next: response => {
        console.log(response);
      }
      ,
      error: err => {

      }
    })
  }
}
