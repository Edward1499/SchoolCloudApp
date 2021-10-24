import { ContactoCorporativo } from "./contacto-corporativo.model";

export interface DetailCorporativoResponse {
    id:                       number;
    S_NombreCorto:            string;
    S_NombreCompleto:         string;
    S_LogoURL:                string;
    S_Activo:                 number;
    S_SystemUrl:              string;
    FK_Asignado_id:           number;
    D_FechaIncorporacion:     string;
    tw_contactos_corporativo: ContactoCorporativo[];
}
