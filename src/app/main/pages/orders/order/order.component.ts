import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  //verifier si l'url a des parametres ou pas pour afficher un message d'erreur ou success
  // si succes : message + cacher button reserve + details d'ordre ? (de la bdd)
  // si fail-stock mssage + cacher button reserve + retour vers la page sessions-list
  // si fail message veuillez recomencer

  
  // envoyer le places, queryPrice, sessionIdFront et userId pour creer un payement

  constructor( 
    private coreConfigService: CoreConfigService, 
    private route: ActivatedRoute) { 
          // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        }
      }
    };
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // get params

      const status = params['status'];
      const orderId = params['orderId'];
  
      console.log('Status:', status);
      console.log('Order ID:', orderId);
    });
  }

}
