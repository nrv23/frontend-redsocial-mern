import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl } from '../../util/api';
import { IUsuario } from '../interfaces/IUsuario';
import { IResponse } from '../interfaces/IResponse';
import { IUserConfigurationResponse } from '../interfaces/IUserConfigurationResponse';
import { getHeaders } from 'src/util/headers';
import { IConfiguration } from '../interfaces/IConfigation';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private backendUrl = getApiUrl();

  constructor(private _http: HttpClient) { }

  registrar(usuario: IUsuario) {

    //delete usuario?.confirm_password;

    const headers = getHeaders(false);

    return this._http.post<IResponse<IUsuario>>(this.backendUrl.concat('/account/signup'), usuario, {
      headers
    });
  }

  obtenerUsuario() {

    const headers = getHeaders(true);
    return this._http.get<IResponse<IUserConfigurationResponse>>(this.backendUrl.concat('/account/'), {
      headers
    });
  }

  actualizarUsuario(user: IConfiguration) {
    const headers = getHeaders(true);
    return this._http.patch(this.backendUrl.concat('/account/update/'), user, {
      headers
    });
  }
}
