import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { OrderToDisplay } from '../models/order';
import { ActivatedRoute } from '@angular/router';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { SessionsService } from '../../sessions/services/sessions.service';
import { SessionToEdit } from '../../sessions/models/session';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  public selectedOrder : OrderToDisplay;
  public ordersList : OrderToDisplay[] = [];

  private sessionId ;
  public currentSession : SessionToEdit;
  

  public keyword = "";
  public page: number = 1;
  public size: number = 5;
  public totalElements: number = 0;
  public totalPages: number = 0;
  date;
  contentHeader: ContentHeader ;
  
  constructor(
    private coreConfigService: CoreConfigService,
    private ordersService : OrdersService,
    private route:ActivatedRoute,
    private sessionsService: SessionsService) { 
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

    this.sessionId =  this.route.snapshot.paramMap.get('id');
    this.sessionsService.getSession(this.sessionId).subscribe(data=>{
      this.currentSession = data as SessionToEdit;
      this.contentHeader = {
        headerTitle: this.currentSession[0].movie.title,
        actionButton: false,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Gestionnaire de films',
              isLink: true,
              link: '/pages/movies-admin'
            },
            {
              name: 'Gestionnaire de séances',
              isLink: true,
              link: `/pages/${this.currentSession[0].movie.id}/sessions-admin`
            },
            {
              name: 'Gestionnaire de réservations',
              isLink: false
            }
          ]
        }
      }
    })

    this.getOrdersList();
  }

  
  getOrdersList() {
    const queryParams = {
      sessionId: this.sessionId,
      keyword: this.keyword,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    this.ordersService.getOrdersList(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          this.ordersList = data.content;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
        }
      },
      (error) => console.log(error)
    );
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getOrdersList();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getOrdersList();
    }
  }
  update(){
    this.page = 1;
    this.getOrdersList();
  }
}
