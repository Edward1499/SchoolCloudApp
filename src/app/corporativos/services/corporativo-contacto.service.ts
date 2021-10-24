import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ContactoCorporativoRequest } from "../models/contacto-corporativo.model";

@Injectable({
    providedIn: 'root'
})
export class CorporativoContactoService {

    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    add(request: ContactoCorporativoRequest) {
        return this.http.post(`${this.apiUrl}/contactos`, request);
    }

    edit(id: number, request: ContactoCorporativoRequest) {
        return this.http.put(`${this.apiUrl}/contactos/${id}`, request);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/contactos/${id}`);
    }

}