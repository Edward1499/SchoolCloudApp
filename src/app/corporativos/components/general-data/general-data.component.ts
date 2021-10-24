import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailCorporativoResponse } from 'app/corporativos/models/detail-corporativo.model';
import { EditCorporativoRequest } from 'app/corporativos/models/edit-corporativo.model';
import { CorporativosService } from 'app/corporativos/services/corporativos.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

enum SystemStatus {
    ACTIVE = 1,
    INACTIVE = 0
}

@Component({
    selector: 'app-general-data',
    templateUrl: './general-data.component.html',
    styleUrls: [
        '../../../../assets/sass/pages/page-users.scss',
        '../../../../assets/sass/libs/select.scss'
    ]
})
export class GeneralDataComponent implements OnDestroy {
    
    private subscription: Subscription = new Subscription();
    detailMode: boolean = true;
    corporativo: DetailCorporativoResponse;
    systemStatus = SystemStatus;
    form: FormGroup = this.fb.group({
        shortName: [{ value: null, disabled: true }, Validators.required],
        fullName: [{ value: null, disabled: true }, Validators.required],
        status: [{ value: this.systemStatus.ACTIVE, disabled: true }, Validators.required],
        incorporationDate: [{ value: null, disabled: true }, Validators.required],
    });
    @Input() set data(value: DetailCorporativoResponse) {
        this.corporativo = value;
        if (this.corporativo) {
         this.fillForm();
        } 
     }
     @Output() onChangeCorporativo = new EventEmitter<EditCorporativoRequest>();

    constructor(
        private corporativosService: CorporativosService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    private fillForm(): void {
        this.form.reset({
            shortName: this.corporativo.S_NombreCorto,
            fullName: this.corporativo.S_NombreCompleto,
            status: this.corporativo.S_Activo,
            incorporationDate: new Date(this.corporativo.D_FechaIncorporacion),
        });
    }

    private save(): void {
        if (!this.form.valid) {
            Swal.fire('Error', 'Debe completar todos los campos con asterisco.', 'error');
            return;
        }

        const formValues = this.form.getRawValue();

        const request: EditCorporativoRequest = {
            id: this.corporativo.id,
            S_NombreCorto: formValues.shortName,
            S_NombreCompleto: formValues.fullName,
            S_LogoURL: this.corporativo.S_LogoURL,
            S_Activo: formValues.status,
            FK_Asignado_id: this.corporativo.FK_Asignado_id,
            D_FechaIncorporacion: new Date(formValues.incorporationDate).toISOString().split('T')[0]
        }

        this.subscription.add(this.corporativosService.edit(request)
            .subscribe(corporativo => {
                this.corporativo = { 
                    tw_contactos_corporativo: this.corporativo.tw_contactos_corporativo,
                    ...corporativo
                 };
                this.fillForm();
                this.detailMode = true;
                this.form.disable();
                this.onChangeCorporativo.emit(this.corporativo);
            })
        );
    }

    onClickLeftButton(): void {
        if (this.detailMode) {
            this.router.navigate(['/corporativos']);
        } else {
            this.detailMode = true;
            this.fillForm();
            this.form.disable();
        }
    }

    onClickRightButton(): void { 
        if (this.detailMode) {
            this.detailMode = false;
            this.form.enable();
        } else {
            this.save();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}