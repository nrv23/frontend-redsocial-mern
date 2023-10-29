import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../../util/headers';
import { getApiUrl } from 'src/util/api';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  constructor(private http: HttpClient,) { }

  private url: string = getApiUrl();

  guardarHistoria(data: FormData) {
    const headers = getHeaders(true);
    return this.http.post<IResponse<{}>>(this.url.concat("/history"), data, {
      headers
    });
  }
}
