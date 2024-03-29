import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FilmeService } from './filme.service';

describe('FilmeService', () => {
  let service: FilmeService;
  let httpMock: HttpTestingController;
  const filmeEsperado = {
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Rated: 'R',
    Released: '14 Sep 1994',
    Runtime: '142 min',
    Genre: 'Drama, Crime',
    Director: 'Frank Darabont',
    Writer: 'Frank Darabont',
    Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton',
    Plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    Language: 'English, Spanish',
    Country: 'USA',
    Awards: 'Nominated for 7 Oscars. 2 wins.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEyLWVkYWUtYTIwMS04ZWNhLTc0ZDk1NTg5ZTc1OSxkYTMwMTU4M2EtNWY5Mi00ZTM5LWJlYzctYzYwMTk4ZmJjNTYxXkEyXkFqcGdeQXVyMTQxNzAyNjI@._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '9.3/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '98%',
      },
      {
        Source: 'Metacritic',
        Value: '88/100',
      },
    ],
    Metascore: '88',
    imdbRating: '9.3',
    imdbVotes: '2,336,162',
    imdbID: 'tt0111161',
    Type: 'movie',
    DVD: '25 Mar 1995',
    BoxOffice: '$16,000,000',
    Production: 'Castle Rock Entertainment',
    Website: 'https://www.shawshankredemption.com/',
    Response: 'True',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilmeService],
    });

    service = TestBed.inject(FilmeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getMovies', () => {
    it('should be return a movie from a query', () => {
      // Arrange
      const apiUrl = 'https://www.omdbapi.com/?i=tt3896198';
      const apiKey = '4eedd1ff';
      const query = 'The Shawshank';
      // Act
      service.getMovies(query).subscribe((filme) => {
        expect(filme).toEqual(filmeEsperado);
      });
      // Assert
      const req = httpMock.expectOne(
        `${apiUrl}&apikey=${apiKey}&t=${encodeURIComponent(query)}&plot=full`
      );
      expect(req.request.method).toBe('GET');
      req.flush(filmeEsperado);
    });
  });

  describe('#getFilm', () => {
    it('should be return a initial movie', () => {
      // Arrange
      const apiUrl = 'https://www.omdbapi.com/?i=tt3896198';
      const apiKey = '4eedd1ff';
      // Act
      service.getFilm().subscribe((filme) => {
        expect(filme).toEqual(filmeEsperado);
      });
      // Assert
      const req = httpMock.expectOne(`${apiUrl}&apikey=${apiKey}`);
      expect(req.request.method).toBe('GET');
      req.flush(filmeEsperado);
    });
  });
});
