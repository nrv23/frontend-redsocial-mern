import { HttpHeaders } from '@angular/common/http';
import { get } from './storage';

export const getHeaders = (token: boolean) => {

    let headers;

    if (token) {
        headers = new HttpHeaders({
            "Authorization": `Bearer ${get("token")}`
        });
    } else {
        headers = new HttpHeaders({});
    }

    return headers;
}

