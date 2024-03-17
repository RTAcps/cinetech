import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Movie } from '../../../shared/models/movie';
import { FilmeService } from '../../service/filme.service';
import { SearchMovieComponent } from './search-movie.component';

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;
  let movieService: jasmine.SpyObj<FilmeService>;
  let SwalMixinSpy: jasmine.SpyObj<{ fire: (arg: any) => void }>;

  const movie = {
    Title: 'Movie 1',
    Year: 'test',
    Actors: 'test',
    Plot: 'test',
    Poster: 'test',
    imdbRating: '7.5',
    Response: 'True',
  };

  const movieError = {
    Title: '',
    Year: '',
    Actors: '',
    Plot: '',
    Poster: '',
    imdbRating: '',
    Response: 'False',
  };

  beforeEach(async () => {
    movieService = jasmine.createSpyObj('FilmeService', ['getMovies']);
    SwalMixinSpy = jasmine.createSpyObj('SwalMixinSpy', ['fire']);

    await TestBed.configureTestingModule({
      imports: [SearchMovieComponent, FormsModule],
      providers: [
        { provide: FilmeService, useValue: movieService },
        { provide: Swal, useValue: { mixin: () => SwalMixinSpy } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#buscarFilme', () => {
    it('should call movieService.getMovies with correct query and emit result on success', () => {
      // Arrange
      component.searchQuery = 'Movie';
      movieService.getMovies.and.returnValue(of(movie));
      // Act
      component.buscarFilme([movie]);
      // Assert
      expect(movieService.getMovies).toHaveBeenCalledWith('Movie');
    });

    it('should handle response errors and display appropriate message', () => {
      // Arrange
      component.searchQuery = 'invalid movie';
      const errorResponse = { Response: 'False' };
      spyOn(component.searchResult, 'emit');
      movieService.getMovies.and.returnValue(of(errorResponse));
      // Act
      component.buscarFilme([movie]);
      // Assert
      expect(movieService.getMovies).toHaveBeenCalledWith('invalid movie');
      expect(component.movies).toEqual([]);
      expect(component.searchResult.emit).toHaveBeenCalledWith([]);
      expect(component.errorText).toEqual(
        'Não foi possível encontrar o filme, verifique se está colocando o título em inglês!'
      );
    });

    it('should emit searchResult with movies when searchQuery is not empty', fakeAsync(() => {
      // Arrange
      movieService.getMovies.and.returnValue(of(movieError));
      component.searchQuery = 'query';
      // Act
      component.buscarFilme([movieError]);
      tick();
      flush();
      // Assert
      expect(component.movies).toEqual([]);
    }));

    it('should show error toast when request 400', () => {
      // Arrange
      const errorResponse = { status: 400 };
      movieService.getMovies.and.returnValue(throwError(errorResponse));
      component.searchQuery = 'query';
      // Act
      component.buscarFilme([]);
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 401', () => {
      // Arrange
      const errorResponse = { status: 401 };
      movieService.getMovies.and.returnValue(throwError(errorResponse));
      component.searchQuery = 'query';
      // Act
      component.buscarFilme([]);
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 404', () => {
      // Arrange
      const errorResponse = { status: 404 };
      movieService.getMovies.and.returnValue(throwError(errorResponse));
      component.searchQuery = 'query';
      // Act
      component.buscarFilme([]);
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when request 500', () => {
      // Arrange
      const errorResponse = { status: 500 };
      movieService.getMovies.and.returnValue(throwError(errorResponse));
      component.searchQuery = 'query';
      // Act
      component.buscarFilme([]);
      // Assert
      expect(component.errorNumber).toEqual(errorResponse.status);
    });

    it('should show error toast when searchQuery is empty', () => {
      // Arrange
      component.searchQuery = '';
      // Act
      component.buscarFilme([]);
      // Assert
      expect(component.errorText).toEqual('O campo não pode estar vazio!');
    });
  });

  describe('#reset', () => {
    it('should reset searchQuery', () => {
      component.searchQuery = 'some query';
      component.reset();
      expect(component.searchQuery).toEqual('');
    });
  });
});
