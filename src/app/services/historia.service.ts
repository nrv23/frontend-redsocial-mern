import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../../util/headers';
import { getApiUrl } from 'src/util/api';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  constructor(private http: HttpClient,) { }

  private url: string = getApiUrl();


}
