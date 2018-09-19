import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { reorderArray } from 'ionic-angular';

import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Array<{ notaId: number, notaOrden: number, notaTexto: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = [];

    this.items.push({
      notaId: 1,
	  notaOrden: 1,
      notaTexto: 'Esta es la nota uno'
    });

    this.items.push({
      notaId: 2,
	  notaOrden: 2,
      notaTexto: 'Esta es la segunda nota'
    });

    this.items.push({
      notaId: 3,
	  notaOrden: 3,
      notaTexto: 'Y esta es la tercera'
    });

  }

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

  delete(event, item) {
    console.log("delete ->");
    console.log(event);
    console.log(item);
  }

  edit(event, item) {
    console.log("edit ->");
    console.log(event);
    console.log(item);
    this.navCtrl.push(DetallePage, {
      item: item
    });
  }

  insert(event) {
    console.log("add ->");
    console.log(event);
    this.navCtrl.push(DetallePage, {
      item: { notaId: '', notaOrden: '', notaTexto: '' }
    });
  }

}
