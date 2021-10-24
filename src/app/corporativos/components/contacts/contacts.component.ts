import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { DetailCorporativoResponse } from "app/corporativos/models/detail-corporativo.model";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ContactoCorporativo } from "app/corporativos/models/contacto-corporativo.model";
import { CorporativoContactoService } from "app/corporativos/services/corporativo-contacto.service";
import { ActivatedRoute } from "@angular/router";
import { CorporativosService } from "app/corporativos/services/corporativos.service";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: [
        '../../../../assets/sass/pages/page-users.scss',
        '../../../../assets/sass/libs/select.scss',
    ]
})
export class ContactsComponent implements OnInit {

  @Input('data') corporativo: DetailCorporativoResponse;
  @Input('contactos') set contactoInput(value: ContactoCorporativo[]) {
    this.contactos$ = of(value);
  };
  contactos$: Observable<ContactoCorporativo[]>;
  currentContact: ContactoCorporativo;

  ColumnMode = ColumnMode;

  // column header
  columns: any[];

  constructor(
    private contactoService: CorporativoContactoService,
    private activatedRoute: ActivatedRoute,
    private corporativosService: CorporativosService
  ) {}

  ngOnInit(): void {
    this.columns = [
      { name: "NOMBRE", prop: "S_Nombre" },
      { name: "PUESTO", prop: "S_Puesto" },
      { name: "TELÉFONO", prop: "N_TelefonoFijo" },
      { name: "CELULAR", prop: "N_TelefonoMovil" },
      { name: "EMAIL", prop: "S_Email" },
      { name: "OBSERVACIONES", prop: "S_Comentarios" },
      { name: "ACCIONES", prop: "Actions" }
    ]
  }

  private getContacts(): void {
    this.contactos$ = this.activatedRoute.params
      .pipe(
          map(({id}) => id),
          switchMap(id => this.corporativosService.getCorporativoById(id)),
          map(data => data.tw_contactos_corporativo)
      );
  }

  onClickEdit(contact: ContactoCorporativo): void {
    this.currentContact = contact;
  }

  onSaveContact(): void {
    this.getContacts();
  }

  delete(id: number): void {
    this.contactoService.delete(id)
      .subscribe(() => {
        this.getContacts();
      });
  }
}