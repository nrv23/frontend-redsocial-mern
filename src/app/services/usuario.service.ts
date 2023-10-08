import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { getApiUrl } from '../../util/api';
import { IUsuario } from '../interfaces/IUsuario';
import { IResponse } from '../interfaces/IResponse';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private backendUrl = getApiUrl();

  constructor(private _http: HttpClient) { }

  registrar(usuario: IUsuario) {

    delete usuario?.confirm_password;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<IResponse<IUsuario>>(this.backendUrl.concat('/signup'), usuario, {
      headers
    });
  }
}
