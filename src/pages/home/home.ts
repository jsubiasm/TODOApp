import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrayNotas: Array<{ notaId: number, notaOrden: number, notaTexto: string }>;

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
          console.log('service getNotas notasArray ->');
          console.log(notasArray);
          var i;
          for (i = 0; i < notasArray.length; i++) {
            var nota = notasArray[i];
            console.log('service getNotas notasArray nota ->');
            console.log(nota);
            var notaIdentificador = nota.identificador[Object.keys(nota.identificador)[0]];
            var notaNumeroOrden = nota.numeroOrden[Object.keys(nota.numeroOrden)[0]];
            console.log('service getNotas notasArray nota.identificador ->');
            console.log(notaIdentificador);
            console.log('service getNotas notasArray nota.numeroOrden ->');
            console.log(notaNumeroOrden);
            this.arrayNotas.push({
              notaId: parseInt(notaIdentificador),
              notaOrden: parseInt(notaNumeroOrden),
              notaTexto: nota.texto
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  reorderNotas(indexes) {
    let notaElement = this.arrayNotas[indexes.from];
    this.arrayNotas.splice(indexes.from, 1);
    this.arrayNotas.splice(indexes.to, 0, notaElement);
    console.log(this.arrayNotas);
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
      nota: { notaId: '', notaOrden: '', notaTexto: '' }
    });
  }

}
