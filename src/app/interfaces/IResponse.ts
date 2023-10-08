export interface IResponse<T> {
    message: string;
    code: string;
    data?: T;
}