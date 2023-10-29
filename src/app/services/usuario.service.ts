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
import { IChangePassword } from '../interfaces/iChangePassword';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private backendUrl = getApiUrl();
  private alertSource = new BehaviorSubject<IAlert | null>(null);
  private verificationAccountStep = new BehaviorSubject<number>(1);
  private currentEmail = new BehaviorSubject<string>("");
  alertSource$ = this.alertSource.asObservable();
  verificationAccountStep$ = this.verificationAccountStep.asObservable();
  currentEmail$ = this.currentEmail.asObservable();


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


  actualizarContrasena(data: IChangePassword) {

    const headers = getHeaders(true);
    const { password, newpassword } = data;

    return this._http.patch<IResponse<{}>>(this.backendUrl.concat('/account/update-password'), {
      password, newpassword
    }, {
      headers
    })
  }

  validarCuenta(email: string) {

    const headers = getHeaders(false);
    return this._http.get<IResponse<boolean>>(this.backendUrl.concat('/account/validate-account/' + email), {
      headers
    });
  }

  validarCodigo(code: string, email: string) {

    const headers = getHeaders(false);
    return this._http.post<IResponse<{}>>(this.backendUrl.concat('/account/validate-code-verification'), { code, email }, {
      headers
    });
  }

  reestablecerContrasena(email: string, password: string) {
    const headers = getHeaders(false);
    return this._http.patch<IResponse<{}>>(this.backendUrl.concat('/account/reset-password'), { email, password }, {
      headers
    });
  }

  cargarUsuarios() {

    const headers = getHeaders(true);
    return this._http.get<IResponse<Usuario[]>>(this.backendUrl.concat('/account/users'), {
      headers
    })
  }

  enviarInvitacionAmistad(friendId: string) {
    const headers = getHeaders(true);
    return this._http.post<IResponse<{}>>(this.backendUrl.concat('/account/send-friend-invitation'), { friendId }, {
      headers
    })
  }

  // ---------------------------------------------------------------

  setAlert(alert: IAlert) {
    this.alertSource.next(alert);
  }

  setVerificationStep(step: number) {
    this.verificationAccountStep.next(step);
  }

  setCurrentEmail(email: string) {
    this.currentEmail.next(email);
  }
}
