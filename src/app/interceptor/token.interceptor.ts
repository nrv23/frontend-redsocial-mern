import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
}
  from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from "../services/token.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const reqAuth = req.headers.get('Authorization');
    if (reqAuth) {
      if (this.tokenService.estaAutenticado()) {
        return next.handle(req);
      } else {
        this.router.navigate(['/login']);
        return throwError("Session expired");
      }
    } else {
      return next.handle(req);
    }
  }
}