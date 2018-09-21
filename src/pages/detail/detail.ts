import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  selectedNota: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider) {    // If we navigated to this page, we will have an item available as a nav param
    this.selectedNota = navParams.get('nota');
  }

  save(event, notaPantalla) {
    if (parseInt(notaPantalla.notaId) >= 0) {
      console.log('service updateNotaTexto [' + notaPantalla.notaId + '] [' + notaPantalla.notaTexto + ']');
    }
    else {
      this.todoServiceProvider.getUltimaNota()
        .subscribe(
          (notasArray: any) => {
            console.log('service getUltimaNota notasArray ->');
            console.log(notasArray);
            var notaNumeroOrden = 0;
            if (notasArray[0]) {
              notaNumeroOrden = notasArray[0].numeroOrden[Object.keys(notasArray[0].numeroOrden)[0]];
              console.log('service getUltimaNota notasArray[0].numeroOrden->');
              console.log(notaNumeroOrden);
              notaNumeroOrden = notaNumeroOrden + 1;
            }
            this.todoServiceProvider.insertNota(notaNumeroOrden, notaPantalla.notaTexto)
              .subscribe(
                (serviceReturn: any) => {
                  console.log('service insertNota serviceReturn ->');
                  console.log(serviceReturn);
                  this.navCtrl.pop();
                },
                (error) => {
                  console.log('service insertNota error ->');
                  console.error(error);
                }
              );
          },
          (error) => {
            console.log('service getUltimaNota error ->');
            console.error(error);
          }
        );
    }
  }
}
