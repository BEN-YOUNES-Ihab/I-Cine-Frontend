import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../../authentication/services/auth.service';
import { UrlData } from '../models/order';
import { CoreConfigService } from '@core/services/config.service';
import { SessionsService } from '../../sessions/services/sessions.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public status = "";
  public orderId = "";
  public sessionId = "";
  public userId;
  public currentSession;

  // variable d'issue de paiement
  orderSucces: boolean = false;
  ordreFail: boolean = false;
  outOfStock: boolean = false;

  // variable prix
  numberOfTickets: number = 1;
  totalPrice: number = 10;

  constructor(
    private route: Router,
     private activatedRoute: ActivatedRoute,
     private ordersService : OrdersService,
     private authService: AuthService,
     private sessionsService :SessionsService,
     private coreConfigService: CoreConfigService
     ) {
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

  ngOnInit(): void {
    this.userId = this.authService.currentUserValue.id;
    this.activatedRoute.queryParams.subscribe(params => {
      this.status = params['status'];
      this.orderId = params['orderId'];
    })
    this.sessionId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.status == "success") {
      console.log('success')
      this.orderSucces = true
    }
    else if (this.status == "fail") {
      this.ordreFail = true
    }
    else if (this.status == "fail-stock") {
      this.outOfStock = true
    }
    else {
      this.orderSucces = false
      this.ordreFail = false
      this.outOfStock = false
    }
    this.getSessionWithMovie();
  }

  getSessionWithMovie(){
    this.sessionsService.getSession(this.sessionId).subscribe(data=>{
      this.currentSession = data[0];
      console.log(this.currentSession)
    })
  }
  convertMinutesToHours(minutes) {
    const hours = Math.floor(+minutes / 60);
    const remainingMinutes = +minutes % 60;
    
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
  
    return `${formattedHours}h${formattedMinutes}`;
  }

  pageReturn() {
    this.route.navigate([`/pages/${this.currentSession.movie.id}/sessions-list`]);
  }

  ajouter() {
    if (this.numberOfTickets < this.currentSession.remaningPlaces) {
      this.numberOfTickets += 1
      this.totalPrice = 10 * this.numberOfTickets
    }
  }
  soustraire() {
    if (this.numberOfTickets > 1) {
      this.numberOfTickets -= 1
      this.totalPrice = 10 * this.numberOfTickets
    }
  }
  order(){
    console.log('hi')
    const queryParams = {
      places: this.numberOfTickets,
      sessionIdFront: this.sessionId,
      userId: this.userId,
    };
    console.log(queryParams)
    this.ordersService.createPaymentCheckout(queryParams).subscribe(data =>{
      let urlData = data as UrlData
      window.location.replace(urlData.url)
    })
  }

}
