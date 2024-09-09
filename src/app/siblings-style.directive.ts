import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSiblingsStyle]'
})
export class SiblingsStyleDirective {

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.element.nativeElement.style.color = 'green';
    this.element.nativeElement.style.fontWeight = 'bold';
  }
}
