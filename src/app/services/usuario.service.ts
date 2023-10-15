import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getApiUrl } from '../../util/api';
import { IUsuario } from '../interfaces/IUsuario';
import { IResponse } from '../interfaces/IResponse';
import { IUserConfigurationResponse } from '../interfaces/IUserConfigurationResponse';
import { getHeaders } from 'src/util/headers';
import { IConfiguration } from '../interfaces/IConfigation';
import { BehaviorSubject } from 'rxjs';
import { IAlert } from '../interfaces/IAlert';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private backendUrl = getApiUrl();
  private alertSource = new BehaviorSubject<IAlert | null>(null);
  alertSource$ = this.alertSource.asObservable();

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
    return this._http.patch<IResponse<{}>>(this.backendUrl.concat('/account/update/'), user, {
      headers
    });
  }

  setAlert(alert: IAlert) {
    this.alertSource.next(alert);
  }
}
