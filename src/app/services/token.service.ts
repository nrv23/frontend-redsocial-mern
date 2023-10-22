import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { get } from 'src/util/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  existeToken() {
    const token = get("token");

    if (token) {
      return token;
    } else {
      return false;
    }
  }

  estaAutenticado() {

    const token = this.existeToken();

    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
