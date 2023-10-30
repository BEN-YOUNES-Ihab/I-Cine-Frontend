import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  
  constructor() { }

  ngAfterViewInit(): void {
    register();
  }

  ngOnInit(): void {
  }

}
