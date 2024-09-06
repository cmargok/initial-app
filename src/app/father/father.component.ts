import { Component } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css']
})
export class FatherComponent {
 
 
  messageToChild: string = 'Mensaje para el hijo';

  recibido: string = '';

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
