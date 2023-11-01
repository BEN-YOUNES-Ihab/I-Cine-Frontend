import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../../authentication/services/auth.service';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  public ordersList : any[] = [];
  public totalElements: number = 0;
  public year = new Date().getFullYear();
  public userId ;
  public archived = "false";

  constructor( 
    private coreConfigService: CoreConfigService, 
    private ordersService : OrdersService,
    private authService: AuthService) { 
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
    this.userId = this.authService.currentUserValue.id;
    this.getOrdersList();
  }
  clickFuturOrders(){
    this.archived = "false";
    this.year = new Date().getFullYear();
    this.getOrdersList();
  }
  clickArchivedOrders(){
    this.archived = "true";
    this.getOrdersList();
  }


  getOrdersList() {
    const queryParams = {
      year : this.year,
      userId : this.userId,
      archived : this.archived
    };
    this.ordersService.getOrdersListByUserId(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          this.ordersList = data.content;
          this.totalElements = data.totalElements;
        }
      },
      (error) => console.log(error)
    );
  }

}
