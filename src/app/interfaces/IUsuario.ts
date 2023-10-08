export interface IUsuario {
    nombre: string;
    apellidos: string;
    correo: string;
    password: string;
    confirm_password?: string;
}