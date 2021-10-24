import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { GeneralDataComponent } from "./components/general-data/general-data.component";
import { CorporativosRoutingModule } from "./corporativos-routing.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { DetailComponent } from "./pages/detail/detail.component";
import { ListComponent } from "./pages/list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";

@NgModule({
    declarations: [
        ListComponent,
        DetailComponent,
        GeneralDataComponent,
        ContactsComponent,
        ContactFormComponent
    ],
    imports: [
        CommonModule,
        CorporativosRoutingModule,
        NgxDatatableModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CorporativosRoutingModule
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class CorporativosModule {}