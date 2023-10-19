import { Component, OnInit, ViewChild } from '@angular/core'
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
https: any;
  

  public contentHeader: object
  public carouselImages: CarouselImages = {
    one: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    two: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    three: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    four: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    five: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg',
    six: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'
  };

  public filmUne = [
    {nom: "Spider Man 2", desc: "Lorem ipsum dolor sit amet. Eos asperiores omnis non rerum accusantium ab magni aliquid sed inventore ullam in delectus eius! Et reprehenderit sunt aut voluptates quia in quia laudantium non perferendis galisum et cupiditate quibusdam.", url: 'https://hips.hearstapps.com/hmg-prod/images/spider-man-across-the-spiderverse-1670500626.jpg?crop=0.7447916666666666xw:1xh;center,top'},
    {nom: "Avatar", desc: "Aut eveniet dolore et galisum unde non modi voluptas aut quia iure non porro consectetur 33 quod laudantium ut esse soluta. Aut dolorum facere aut modi laboriosam in accusantium illum sed tenetur quis. Et voluptatem illo aut natus expedita eos consequuntur facilis et blanditiis quia non modi enim aut laudantium voluptatibus ut obcaecati mollitia.", url: 'https://fr.web.img3.acsta.net/r_1280_720/newsv7/20/05/28/10/32/0784252.jpg'},
    {nom: "Oppenheimer", desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,", url: 'https://www.radiofrance.fr/s3/cruiser-production/2023/08/77d9c0e6-37ec-41c3-bb4e-c1902017302f/1200x680_sc_oppenheimer.jpg'},
  ]
  public filmAffiche = [
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
    {nom: "Spider Man 2",url: 'https://fr.web.img5.acsta.net/c_310_420/pictures/18/11/13/11/42/1696141.jpg'},
    {nom: "Avatar",url: 'https://fr.web.img4.acsta.net/pictures/22/11/02/14/49/4565071.jpg'},
  ]
  public filmAvantPr = [
    {nom: "Fast & Furious 72",url: 'https://fr.web.img5.acsta.net/pictures/23/05/10/10/55/5129031.jpg'},
    {nom: "Pattie",url: 'https://www.toulouseblog.fr/wp-content/uploads/2022/10/pattie.jpeg'},
    {nom: "Black Adam",url: 'https://fr.web.img4.acsta.net/c_310_420/pictures/22/10/04/14/00/5857542.jpg'},
    {nom: "Fast & Furious 72",url: 'https://fr.web.img5.acsta.net/pictures/23/05/10/10/55/5129031.jpg'},
    {nom: "Pattie",url: 'https://www.toulouseblog.fr/wp-content/uploads/2022/10/pattie.jpeg'},
    {nom: "Black Adam",url: 'https://fr.web.img4.acsta.net/c_310_420/pictures/22/10/04/14/00/5857542.jpg'},
    {nom: "Fast & Furious 72",url: 'https://fr.web.img5.acsta.net/pictures/23/05/10/10/55/5129031.jpg'},
    {nom: "Pattie",url: 'https://www.toulouseblog.fr/wp-content/uploads/2022/10/pattie.jpeg'},
    {nom: "Black Adam",url: 'https://fr.web.img4.acsta.net/c_310_420/pictures/22/10/04/14/00/5857542.jpg'},
    {nom: "Fast & Furious 72",url: 'https://fr.web.img5.acsta.net/pictures/23/05/10/10/55/5129031.jpg'},
    {nom: "Pattie",url: 'https://www.toulouseblog.fr/wp-content/uploads/2022/10/pattie.jpeg'},
    {nom: "Black Adam",url: 'https://fr.web.img4.acsta.net/c_310_420/pictures/22/10/04/14/00/5857542.jpg'},
    
  ]
  public filmSlides: any[] = [];
  public filmSlides2: any[] = [];

  constructor() {
    this.organizeFilms(this.filmAffiche, this.filmSlides);
    this.organizeFilms(this.filmAvantPr, this.filmSlides2);
  }
  
  organizeFilms(films: any[], slides: any[]) {
    const filmsPerSlide = 6; // Nombre de films par diapositive
    for (let i = 0; i < films.length; i += filmsPerSlide) {
      slides.push(films.slice(i, i + filmsPerSlide));
    }
  }
  
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
