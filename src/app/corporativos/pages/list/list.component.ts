import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { Observable, Subscription } from 'rxjs';
import { Corporativo } from '../../models/corporativos.model';
import { CorporativosService } from '../../services/corporativos.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: [
        './list.component.scss',
        '../../../../assets/sass/libs/datatables.scss'
    ]
})
export class ListComponent implements OnInit {
    
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  // public rows: Corporativo[];
  rows$: Observable<any>;
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns: any[];

  constructor(private corpotativosService: CorporativosService) {}

    ngOnInit(): void {
        this.columns = [
            { name: "CORPORATIVO", prop: "S_NombreCorto" },
            { name: "URL", prop: "S_SystemUrl" },
            { name: "INCORPORACIÓN", prop: "D_FechaIncorporacion" },
            { name: "CREADO EL", prop: "created_at" },
            { name: "ASIGNADO A", prop: "asignado.S_Apellidos" },
            { name: "STATUS", prop: "Status" },
            { name: "ACCIONES", prop: "Actions" }
        ]
      
        this.rows$ = this.corpotativosService.getCorporativosList();
    }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
}
