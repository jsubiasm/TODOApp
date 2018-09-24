import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

import { Nota } from '../../model/nota';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrayNotas: Nota[];

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
    this.arrayNotas = [];
    this.todoServiceProvider.getNotas()
      .subscribe(
        (notasArray: any) => {
          var i;
          for (i = 0; i < notasArray.length; i++) {
            var nota = notasArray[i];
            this.arrayNotas.push(
              new Nota(
                parseInt(nota.identificador.$numberLong),
                parseInt(nota.numeroOrden.$numberLong),
                nota.texto
              )
            );
          }
        },
        (error) => {
          console.error('service getNotas error ->');
          console.error(error);
        }
      );
  }

  reorderNotas(indexes) {
    let notaElement = this.arrayNotas[indexes.from];
    this.arrayNotas.splice(indexes.from, 1);
    this.arrayNotas.splice(indexes.to, 0, notaElement);
    this.arrayNotas.forEach(function (notaItem, idx) {
      console.log('service updateNotaNumeroOrden [' + notaItem.notaId + '] [' + idx + ']');
    });
  }

  delete(event, nota) {
    console.log('service deleteNota [' + nota.notaId + ']');
    console.log('service getNotas');
  }

  edit(event, nota) {
    this.navCtrl.push(DetailPage, {
      nota: nota
    });
  }

  insert(event) {
    this.navCtrl.push(DetailPage, {
      nota: new Nota(null, null, '')
    });
  }

}
