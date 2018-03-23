import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter;
  ngOnInit() {
    console.log(this.leyenda);
  }
  cambiarValor( valor: number ) {
    if (this.porcentaje >= 100 && this.porcentaje > 0) {
      this.porcentaje = 100;
      return;
      }
    if (this.porcentaje <= 100 && this.porcentaje < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.txtProgress.nativeElement.focus();

    this.cambioValor.emit( this.porcentaje );
  }

  cambio( event ) {
    // let html: any = window.document.getElementsByName('porcentaje')[0];
    if ( event >= 100 ) {
      this.porcentaje = 100;
    } else if ( event <= 0 ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = event;
    }
    // html.value = this.porcentaje;
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );
  }
}

