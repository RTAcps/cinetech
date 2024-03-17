import { PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../../shared/models/movie';
import { FilmeService } from '../../core/service/filme.service';
import Swal from 'sweetalert2';

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
  @Input() movieInitial!: Movie[];
  @Input() loading: boolean = true;
  @Input() initial!: boolean;

  public title!: string;
  public year!: string;
  public actors!: string;
  public plot!: string;
  public poster!: string;
  public rating!: number;
  public errorNumber!: number;
  public errorText!: string;

  constructor(private movieService: FilmeService) {}

  ngOnInit(): void {
    if (this.initial) {
      this.showFilmInitial();
    } else {
      setTimeout(() => {
        this.getInfo(this.movieData);
        this.loading = false;
        this.initial = false;
      }, 3000);
    }
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
    this.rating = Number(movie?.imdbRating * 5) / 10;
  }

  public showFilmInitial(): void {
    this.movieService.getFilm().subscribe({
      next: (data: any) => {
        this.initial = true;
        this.getInfo(data);
      },
      error: (e) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        if (e.status === 400) {
          this.errorNumber = e.status;

          Toast.fire({
            icon: 'error',
            title: 'Houve um erro inesperado!',
          });
        } else if (e.status === 401) {
          this.errorNumber = e.status;
          Toast.fire({
            icon: 'error',
            title: 'Você não tem autorização para acessar!',
          });
        } else if (e.status === 404) {
          this.errorNumber = e.status;
          Toast.fire({
            icon: 'error',
            title: 'Não foi possível encontrar o filme!',
          });
        } else if (e.status === 500) {
          this.errorNumber = e.status;
          Toast.fire({
            icon: 'error',
            title: 'O servidor apresentou um problema!',
          });
        }
      },
    });
  }
}
