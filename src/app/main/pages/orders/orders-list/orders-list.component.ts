import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  filters = [{title:"hello",date:"12/21/3123",places:"23",amount:"21"},{title:"hello",date:"12/21/3123",places:"23",amount:"21"},{title:"hello",date:"12/21/3123",places:"23",amount:"21"}]
 
  public ordersList : any[];
  public totalElements: number = 0;
  public year = new Date().getFullYear();
  public userId ;
  public archived = "false";

  constructor(private ordersService : OrdersService,private authService: AuthService) { }

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
          console.log(data)
          this.ordersList = data.content;
          this.totalElements = data.totalElements;
        }
      },
      (error) => console.log(error)
    );
  }

}
