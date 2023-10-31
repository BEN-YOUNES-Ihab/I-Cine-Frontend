import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import {
  SwiperOptions,
} from 'swiper';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss']
})
export class MoviesHomeComponent implements OnInit, AfterViewInit {


  public config: SwiperOptions = {};
  
  constructor(private coreConfigService: CoreConfigService) { 
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: false
        }
      }
    };
  }

  ngAfterViewInit(): void {
    register();
  }

  ngOnInit(): void {
  }

}
