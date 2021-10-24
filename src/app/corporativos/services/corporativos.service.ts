import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CorporativosModel } from '../models/corporativos.model';
import { EditCorporativoRequest } from '../models/edit-corporativo.model';

@Injectable({
    providedIn: 'root'
})
export class CorporativosService {

    private apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    getCorporativosList(): Observable<CorporativosModel> {
        return this.http.get<CorporativosModel>(`${this.apiUrl}/corporativos`);
    }

    getCorporativoById(id: number) {
        return this.http.get(`${this.apiUrl}/corporativos/${id}`)
                .pipe(
                    map(data => data['data']['corporativo'])
                );
    }

    edit(request: EditCorporativoRequest) {
        return this.http.put(`${this.apiUrl}/corporativos/${request.id}`, request)
                .pipe(
                    map(data => data['data'])
                );
    }
}