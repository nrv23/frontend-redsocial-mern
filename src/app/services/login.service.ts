import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';
import { getApiUrl } from '../../util/api';
import { IResponse } from '../interfaces/IResponse';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { getHeaders } from '../../util/headers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  private backendUrl = getApiUrl();

  login(user: ILogin) {

    const headers = getHeaders(false);
    return this._http.post<IResponse<ILoginResponse>>(this.backendUrl.concat('/account/login'), user, {
      headers
    });
  }
}
