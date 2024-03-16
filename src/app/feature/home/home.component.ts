import { Component } from '@angular/core';
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
  ],
  providers: [FilmeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title = 'CineTech';
  public movieDetails!: Movie[];

  public updateMovies(movies: Movie[]): void {
    this.movieDetails = movies;
  }
}
