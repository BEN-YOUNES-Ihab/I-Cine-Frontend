import { Component, OnInit } from '@angular/core'
export interface CarouselImages {
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
  six?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  public contentHeader: object
  public carouselImages: CarouselImages = {
    one: 'assets/images/avatars/1.png',
    two: 'assets/images/avatars/2.png',
    three: 'assets/images/avatars/3.png',
    four: 'assets/images/avatars/4.png',
    five: 'assets/images/avatars/6.png',
    six: 'assets/images/avatars/7.png'
  };
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }
}
