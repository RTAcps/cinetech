import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { CardMovieComponent } from './card-movie.component';
import { FilmeService } from '../../core/service/filme.service';
import { of, throwError } from 'rxjs';

describe('CardMovieComponent', () => {
  let component: CardMovieComponent;
  let fixture: ComponentFixture<CardMovieComponent>;
  let movieService: jasmine.SpyObj<FilmeService>;
  const movie = {
    Title: 'Inception',
    Year: '2010',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
    Plot: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
    Poster: 'http://example.com/poster.jpg',
    imdbRating: '8.8',
  };

  beforeEach(async () => {
    movieService = jasmine.createSpyObj('FilmeService', ['getFilm']);
    await TestBed.configureTestingModule({
      imports: [CardMovieComponent],
      providers: [{ provide: FilmeService, useValue: movieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ariaValueText', () => {
    it('should return correct aria value text', () => {
      // Arrange
      // Act
      const result = component.ariaValueText(3, 5);
      // Assert
      expect(result).toEqual('3 out of 5 stars');
    });
  });

  describe('getInfo', () => {
    it('should set properties correctly when movie is provided', () => {
      // Arrange
      // Act
      component.getInfo(movie);
      // Assert
      expect(component.title).toEqual('Inception');
      expect(component.year).toEqual('2010');
      expect(component.actors).toEqual(
        'Leonardo DiCaprio, Joseph Gordon-Levitt'
      );
      expect(component.plot).toEqual(
        'A thief who enters the dreams of others to steal secrets from their subconscious.'
      );
      expect(component.poster).toEqual('http://example.com/poster.jpg');
      expect(component.rating).toEqual(4.4);
    });

    it('should set properties to undefined when movie is not provided', () => {
      // Arrange
      const movie = undefined;
      // Act
      component.getInfo(movie);
      // Assert
      expect(component.title).toBeUndefined();
      expect(component.year).toBeUndefined();
      expect(component.actors).toBeUndefined();
      expect(component.plot).toBeUndefined();
      expect(component.poster).toBeUndefined();
      expect(component.rating).toBeNaN();
    });
  });

  describe('#OnInit', () => {
    it('should call getInfo and set loading to false after 3 seconds', fakeAsync(() => {
      // Arrange
      spyOn(component, 'getInfo');
      // Act
      component.ngOnInit();
      tick(3000);
      // Assert
      expect(component.getInfo).toHaveBeenCalledWith(component.movieData);
      expect(component.loading).toBeFalse();
    }));
  });

  describe('#showFilmInitial', () => {
    it('should call movieService.getMovies with correct query and emit result on success', () => {
      // Arrange
      movieService.getFilm.and.returnValue(of(movie));
      spyOn(component, 'getInfo');
      // Act
      component.showFilmInitial();
      // Assert
      expect(movieService.getFilm).toHaveBeenCalled();
      expect(component.initial).toBeTruthy();
      expect(component.getInfo).toHaveBeenCalledWith(movie);
    });

    it('should show error toast when request 400', () => {
      // Arrange
      const errorResponse = { status: 400 };
      movieService.getFilm.and.returnValue(throwError(errorResponse));
      // Act
      component.showFilmInitial();
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 401', () => {
      // Arrange
      const errorResponse = { status: 401 };
      movieService.getFilm.and.returnValue(throwError(errorResponse));
      // Act
      component.showFilmInitial();
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 404', () => {
      // Arrange
      const errorResponse = { status: 404 };
      movieService.getFilm.and.returnValue(throwError(errorResponse));
      // Act
      component.showFilmInitial();
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 500', () => {
      // Arrange
      const errorResponse = { status: 500 };
      movieService.getFilm.and.returnValue(throwError(errorResponse));
      // Act
      component.showFilmInitial();
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });
  });
});
