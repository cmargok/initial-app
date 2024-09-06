import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent {

  @Input() sonReceive: string = '';
  @Output() mensajeDelHijoEmmiter = new EventEmitter<string>();
  @Output() inc = new EventEmitter<void>();
  @Output() dec = new EventEmitter<void>();
  messagetoFather: string = '';

  messageFromSon()
  {
    this.mensajeDelHijoEmmiter.emit(this.messagetoFather);
  }
  incrementar() {
    this.inc.emit();
  }

  decrementar() {
    this.dec.emit();
  }
  
}
