import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router, private title: Title, public meta: Meta ) {
    this.getDataRoute()
      .subscribe( event => {
        this.titulo = event.titulo;
        this.title.setTitle( event.titulo );

        // actualizando los metadatos

        let metadatos: MetaDefinition[] = [{
          name: 'description',
          content: event.titulo
        },
        {
          name: 'keyboard',
          content: 'palabras claves'
        }
      ];

        this.meta.addTags(metadatos);
      });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd )
      .filter( (evento: ActivationEnd ) => evento.snapshot.firstChild === null)
      .map( (evento: ActivationEnd) => evento.snapshot.data );
  }
}
