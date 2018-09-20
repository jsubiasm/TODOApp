import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  save(event, item) {
    if (item.notaId) {
      console.log('service updateNotaTexto [' + item.notaId + '] [' + item.notaTexto + ']');
    }
    else {
      console.log('service getUltimaNota');
      console.log('service insertNota [ultima nota + 1] [' + item.notaTexto + ']');
    }
    this.navCtrl.pop();
  }
}
