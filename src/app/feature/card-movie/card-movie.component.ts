import { PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [NgbRatingModule],
  providers: [
    {
      provide: PRECONNECT_CHECK_BLOCKLIST,
      useValue: 'https://m.media-amazon.com',
    },
  ],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.scss',
})
export class CardMovieComponent implements OnInit {
  @Input() movieData!: Movie[];

  public title!: string;
  public year!: string;
  public actors!: string;
  public plot!: string;
  public poster!: string;
  public rating!: number;
  public loading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.getInfo(this.movieData);
      this.loading = false;
    }, 3000);
  }

  public ariaValueText(current: number, max: number) {
    return `${current} out of ${max} stars`;
  }

  public getInfo(movie: any) {
    this.title = movie?.Title;
    this.year = movie?.Year;
    this.actors = movie?.Actors;
    this.plot = movie?.Plot;
    this.poster = movie?.Poster;
    this.rating = Number((movie?.imdbRating * 5) / 10);
  }
}
