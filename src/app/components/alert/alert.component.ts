import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  class: string = '';
  message: string = '';

  ngOnInit(): void {
    this.usuarioService.alertSource$.subscribe({
      next: response => {
        if (response) {
          console.log({ response });
          this.class = response.class;
          this.message = response.message;
        }
      }
    })
  }

}
