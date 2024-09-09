import { Component, OnInit } from '@angular/core';
import { FamilyServiceService } from '../family-service.service';

@Component({
  selector: 'app-hermano',
  templateUrl: './hermano.component.html',
  styleUrls: ['./hermano.component.css']
})
export class HermanoComponent implements OnInit{
  nombreHermanoPequeno?: string ;
  constructor(
    private _familyService: FamilyServiceService
  ) 
  { 

  }

  ngOnInit(): void {
    this._familyService.sethermanoPequeno('Pedro');
    this.nombreHermanoPequeno = this._familyService.gethermanoPequeno();
  }

  saludar()
  {
    this._familyService.saludar(this._familyService.gethermanoGrande() || '');
  }

  preguntar()
  {
    console.log(this._familyService.preguntarPorHijo());
  }

}
