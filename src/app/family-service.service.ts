import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FamilyServiceService {

  hermanoGrande?: string ;
  hermanoPequeno?: string ;
  constructor() { }

  gethermanoGrande(): string {
    return this.hermanoGrande || '';
  }

  sethermanoGrande(hermano: string) {
    this.hermanoGrande = hermano;
  }

  gethermanoPequeno(): string {
    return this.hermanoPequeno || '';
  }

  sethermanoPequeno(hermano: string) {
    this.hermanoPequeno = hermano;
  }


  saludar(hermano: string): string {
    console.log(`Hola ${hermano}`);
    return `Hola ${hermano}`;
  }

  preguntarPorHijo() : string  {
    return '¿Cómo está tu hijo?';
  }
}
