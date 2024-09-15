import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formularioContacto: FormGroup;
  usuarioActivo: any =
  {
    nombre : 'Maicol',
    apellido : 'Gonzalez',
    identificacion : '123456',
    email : ''
  };
  typeId: string = 'Identification';

  constructor(private form: FormBuilder) {
    this.formularioContacto = this.form.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: [''],
        identification: ['', [Validators.required, Validators.minLength(3)]],
        identificationType: [''],
        email: ['', [Validators.required, Validators.email]],
    });    
  }


  ngOnInit(): void {
    //add validators
    this.formularioContacto.get('lastName')?.setValidators([Validators.required, Validators.minLength(3)]);

    //remove validators
    this.formularioContacto.get('lastName')?.clearValidators();
    this.formularioContacto.get('lastName')?.updateValueAndValidity();//se tiene que actualizar el formulario


   // this.formularioContacto.get('name')?.setValue(this.usuarioActivo);
   this.formularioContacto.patchValue(
    {
      name: this.usuarioActivo.nombre,
     // lastName: this.usuarioActivo.apellido,
      identification:  this.usuarioActivo.identificacion,
      email: ''
    }
   );
    this.formularioContacto.get('name')?.disable();
   // this.formularioContacto.get('lastName')?.disable();
    this.formularioContacto.get('identification')?.disable();

    this.subscribeToFormChangesToChangeTypeIdLabel();
  }

  subscribeToFormChanges() {
    this.formularioContacto.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  subscribeToFormChangesToChangeTypeIdLabel() {
    this.formularioContacto.get('identificationType')?.valueChanges.subscribe((value) => {
     this.typeId = value;
    });
  }

  public user: any  = {
    name: '',
    email: '',
  };

  send() {
    if(this.formularioContacto.valid){
      console.log('Formulario válido');
      console.log(this.formularioContacto.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  hasErrors(controlName: string, errorType:string): any {
    return this.formularioContacto.get(controlName)?.hasError(errorType) && this.formularioContacto.get(controlName)?.touched;

  }

}
