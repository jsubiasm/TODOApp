import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Array<{ notaId: number, notaOrden: number, notaTexto: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = [];

    console.log('service getNotas');

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }  

  reorderItems(indexes) {
    console.log("reorderItems init ->");
    console.log(indexes);
    console.log(this.items);
    console.log("reorderItems splice ->");
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    console.log(this.items);
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
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  insert(event) {
    console.log("add ->");
    console.log(event);
    this.navCtrl.push(DetailPage, {
      item: { notaId: '', notaOrden: '', notaTexto: '' }
    });
  }

}
