import { Component, OnInit } from '@angular/core';

declare function cargaPrincipal();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    cargaPrincipal();
  }

}
