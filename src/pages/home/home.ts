import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Array<{ notaId: number, notaOrden: number, notaTexto: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider) {
  }

  /*
  ionViewDidLoad() { console.log('service ionViewDidLoad'); }
  ionViewWillEnter() { console.log('service ionViewWillEnter'); }
  ionViewDidEnter() { console.log('service ionViewDidEnter'); }
  ionViewWillLeave() { console.log('service ionViewWillLeave'); }
  ionViewDidLeave() { console.log('service ionViewDidLeave'); }
  ionViewWillUnload() { console.log('service ionViewWillUnload'); }
  ionViewCanEnter() { console.log('service ionViewCanEnter'); }
  ionViewCanLeave() { console.log('service ionViewCanLeave'); }
  */

  ionViewWillEnter() {

    this.items = [];

    console.log('service getNotas');
    this.todoServiceProvider.getNotas()
      .subscribe(
        (data) => {
          console.log('service getNotas response ->');
          console.log(data);
          this.items = data['results'];
        },
        (error) => {
          console.error(error);
        }
      )

    /*this.items.push({
      notaId: 0,
      notaOrden: 0,
      notaTexto: 'Esta es la nota uno'
    });

    this.items.push({
      notaId: 1,
      notaOrden: 1,
      notaTexto: 'Esta es la segunda nota'
    });

    this.items.push({
      notaId: 2,
      notaOrden: 2,
      notaTexto: 'Y esta es la tercera'
    });*/

  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    console.log(this.items);
    this.items.forEach(function (element, idx) {
      console.log('service updateNotaNumeroOrden [' + element.notaId + '] [' + idx + ']');
    });
  }

  delete(event, item) {
    console.log('service deleteNota [' + item.notaId + ']');
    console.log('service getNotas');
  }

  edit(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  insert(event) {
    this.navCtrl.push(DetailPage, {
      item: { notaId: '', notaOrden: '', notaTexto: '' }
    });
  }

}
