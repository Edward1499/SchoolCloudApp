import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ContactoCorporativo, ContactoCorporativoRequest } from "app/corporativos/models/contacto-corporativo.model";
import { CorporativoContactoService } from "app/corporativos/services/corporativo-contacto.service";
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  corporativoId: number;
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    position: [null, Validators.required],
    comments: [null],
    telephone: [null, Validators.required],
    cellphone: [null, Validators.required],
    email: [null, Validators.required],
  });
  contact: ContactoCorporativo;
  @Input() set data(value: ContactoCorporativo) {
    if (value) {
      this.contact = value;
      this.fillForm();
    } else {
      this.form.reset();
    }
  };
  @Output() onSave = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private contactoService: CorporativoContactoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.activatedRoute.params 
      .subscribe(({id}) => {
        this.corporativoId = id;
      })
    );
  }

  private fillForm(): void {
    this.form.reset({
      name: this.contact.S_Nombre,
      position: this.contact.S_Puesto,
      comments: this.contact.S_Comentarios,
      telephone: this.contact.N_TelefonoFijo,
      cellphone: this.contact.N_TelefonoMovil,
      email: this.contact.S_Email
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      Swal.fire('Error', 'Debe completar todos los campos con asterisco.', 'error');
      return;
    }

    const formValues = this.form.getRawValue();
    const request: ContactoCorporativoRequest = {
      S_Nombre: formValues.name,
      S_Puesto: formValues.position,
      S_Comentarios: formValues.comments,
      N_TelefonoFijo: formValues.telephone,
      N_TelefonoMovil: formValues.cellphone,
      S_Email: formValues.email,
      tw_corporativo_id: this.corporativoId
    }

    if(!this.contact) {
      this.subscription.add(this.contactoService.add(request)
        .subscribe(() => {
          this.form.reset();
          this.onSave.emit();
        })
      );
    } else {
      this.subscription.add(this.contactoService.edit(this.contact.id, request)
        .subscribe(() => {
          this.form.reset();
          this.contact = null;
          this.onSave.emit();
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}