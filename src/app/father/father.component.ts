import { Component, OnInit } from '@angular/core';
import { FamilyServiceService } from '../family-service.service';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css']
})
export class FatherComponent implements OnInit { 
 
  messageToChild: string = 'Mensaje para el hijo';
  recibido: string = '';
  nombreHermanoGrande?: string ;
  constructor(
    private _familyService: FamilyServiceService
  ) 
  { 

  }
  ngOnInit(): void {
    this._familyService.sethermanoGrande('Juan');
    this.nombreHermanoGrande = this._familyService.gethermanoGrande();
  }

  saludar()
  {
    this._familyService.saludar(this._familyService.gethermanoPequeno() || '');
  }

  preguntar()
  {
    console.log(this._familyService.preguntarPorHijo());
  } 


  fatherReceives(message: string) {
    this.recibido = message;
  }

  valorContador: number = 0;
  
  incrementar() {
    this.valorContador++;
  }

  decrementar() {
    this.valorContador--;
  }
  

}
