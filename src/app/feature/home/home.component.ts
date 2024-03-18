import { NgOptimizedImage, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import {
  Component,
  HostListener,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../../core/component/footer/footer.component';
import { HeaderComponent } from '../../core/component/header/header.component';
import { SearchMovieComponent } from '../../core/component/search-movie/search-movie.component';
import { FilmeService } from '../../core/service/filme.service';
import { Movie } from '../../shared/models/movie';
import { CardMovieComponent } from '../card-movie/card-movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CardMovieComponent,
    SearchMovieComponent,
    NgOptimizedImage,
    NgbCarouselModule,
  ],
  providers: [
    FilmeService,
    {
      provide: PRECONNECT_CHECK_BLOCKLIST,
      useValue: 'https://m.media-amazon.com',
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  public title = 'CineTech';
  public movieDetails!: Movie[];
  public movieInitial!: Movie[];

  public paused = false;
  public pauseOnHover = true;
  public pauseOnFocus = true;

  public isMobileView!: boolean;

  public moviesPosters: any[] = [
    {
      imgSrc:
        'https://proxy.olhardigital.com.br/wp-content/uploads/2024/01/Destaque-Indicados-ao-Oscar-2024.jpg',
      imgAlt: 'Poster com os destaque indicados ao Oscar 2024',
      width: 477,
      height: 268,
    },
    {
      imgSrc:
        'https://www.ofuxico.com.br/img/upload/noticias/2021/03/19/filmes-indicados-ao-oscar-2021-saiba-mais_399119_36.jpg',
      imgAlt: 'Poster com os destaque indicados ao Oscar 2021',
      width: 422.5,
      height: 268,
    },
    {
      imgSrc:
        'https://s2.glbimg.com/Sq3Z_Z2rPi-LDzcKIRjSX3mf5b4=/e.glbimg.com/og/ed/f/original/2021/04/21/design_sem_nome.png',
      imgAlt: 'Poster com os destaque indicados ao Oscar 2019',
      width: 558,
      height: 268,
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.isMobileView = window.innerWidth <= 768;
    });
  }

  public updateMovies(movies: Movie[]): void {
    this.movieDetails = movies;
  }

  public resetMovies(): void {
    this.movieDetails = [];
  }

  public isFirstSlide(movie: any): boolean {
    return this.moviesPosters.indexOf(movie) === 0;
  }

  public togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  public onSlide(slideEvent: NgbSlideEvent) {
    if (
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event: any) {
    this.isMobileView = window.innerWidth <= 768;
  }
}
