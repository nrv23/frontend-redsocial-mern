import { Usuario } from '../models/Usuario';
export interface ILoginResponse {

    token: string;
    usuario: Usuario
}