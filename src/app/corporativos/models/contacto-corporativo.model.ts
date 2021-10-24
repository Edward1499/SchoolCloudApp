export interface ContactoCorporativo {
    id:                number;
    tw_corporativo_id: number;
    N_TelefonoFijo:    number;
    N_TelefonoMovil:   number;
    S_Comentarios?:    string;
    S_Email:           string;
    S_Nombre:          string;
    S_Puesto:          string;
    created_at:        string;
    updated_at:        string;
}

export interface ContactoCorporativoRequest {
    S_Nombre:          string;
    S_Puesto:          string;
    S_Comentarios:     string;
    N_TelefonoFijo:    null;
    N_TelefonoMovil:   number;
    S_Email:           string;
    tw_corporativo_id: number;
}
