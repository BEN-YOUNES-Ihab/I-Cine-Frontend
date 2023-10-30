import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersList(queryParams: any){
    return this.http.get(environment.apiUrl + 'orders/getOrdersList', { params: queryParams });  
  }
  getOrdersListByUserId(queryParams: any){
    return this.http.get(environment.apiUrl + 'orders/getOrdersListByUserId', { params: queryParams });  
  }
  createPaymentCheckout(queryParams: any){
    return this.http.get(environment.apiUrl + 'payement/create-checkout', { params: queryParams });  
  }
}
