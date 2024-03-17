import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FilmeService } from '../../service/filme.service';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.scss',
})
export class SearchMovieComponent {
  @Output() searchResult = new EventEmitter<Movie[]>();

  public movies: Movie[] = [];
  public selectedMovie: Movie | null = null;
  public searchQuery: string = '';
  public errorNumber!: number;
  public errorText!: string;

  constructor(private movieService: FilmeService) {}

  public buscarFilme(movie: Movie[]): void {
    if (this.searchQuery.trim() !== '') {
      this.movies = [];
      this.searchResult.emit(this.movies);
      this.movieService.getFilme(this.searchQuery).subscribe({
        next: (data: any) => {
          if (data?.Response === 'False') {
            this.errorText =
              'Não foi possível encontrar o filme, verifique se está colocando o título em inglês!';
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'error',
              title:
                'Não foi possível encontrar o filme, verifique se está colocando o título em inglês!',
            });
          } else {
            this.movies = data;
            this.searchResult.emit(this.movies);
          }
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
    } else {
      this.errorText = 'O campo não pode estar vazio!';

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
      Toast.fire({
        icon: 'error',
        title: 'O campo não pode estar vazio!',
      });
    }
  }

  public reset(): void {
    this.searchQuery = '';
    this.movies = [];
    this.searchResult.emit(this.movies);
  }
}
