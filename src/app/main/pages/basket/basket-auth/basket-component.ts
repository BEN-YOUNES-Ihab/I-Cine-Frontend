import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-basket',
  templateUrl: './basket-component.html',
  styleUrls: ['./basket-component.scss']
})
export class BasketComponent implements OnInit {

  selectedFilm: any; // Vous devrez peut-être ajuster le type en fonction de votre modèle de données

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.selectedFilm = params; // Ici, vous pouvez obtenir les détails de l'élément sélectionné
    });
  }
  /**
   * On init
   */
  ngOnInit() {}
  async onBuyClicked(){
    console.log('Buy')
    const res = await fetch("http://localhost:4200/payement/create-checkout");
    const resJon = await res.json()
    window.location.href = resJon.url;
  }
  
}
