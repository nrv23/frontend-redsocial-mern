import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';
import { getApiUrl } from '../../util/api';
import { IResponse } from '../interfaces/IResponse';
import { map } from 'rxjs';
import { save } from 'src/util/storage';
import { ILoginResponse } from '../interfaces/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  private backendUrl = getApiUrl();

  login(user: ILogin) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<IResponse<ILoginResponse>>(this.backendUrl.concat('/login'), user, {
      headers
    });
  }
}
