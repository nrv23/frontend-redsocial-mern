import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';
import { getApiUrl } from '../../util/api';
import { IResponse } from '../interfaces/IResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { getHeaders } from '../../util/headers';
import { map, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  private currentUser = new BehaviorSubject<Usuario | undefined>(undefined);
  private backendUrl = getApiUrl();

  currentUser$ = this.currentUser.asObservable();
  login(user: ILogin) {

    const headers = getHeaders(false);
    return this._http.post<IResponse<ILoginResponse>>(this.backendUrl.concat('/account/login'), user, {
      headers
    }).pipe(map(response => {
      this.setCurrentUser(response.data!.usuario);
      return response;
    }));
  }

  setCurrentUser(user: Usuario) {
    this.currentUser.next(user);
  }
}
