import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmeService } from '../../core/service/filme.service';
import { Movie } from '../../shared/models/movie';
import { HomeComponent } from './home.component';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

interface TempNgbSlideEvent {
  paused: boolean;
  source: NgbSlideEventSource;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let filmeService: FilmeService;

  beforeEach(async () => {
    filmeService = jasmine.createSpyObj('FilmeService', ['getFilme']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [FilmeService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    filmeService = TestBed.inject(FilmeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#updateMovie', () => {
    it('should update movieDetails correctly', () => {
      // Arrange
      const movies: Movie[] = [
        {
          Title: 'Movie 1',
          Year: '2022',
          imdbRating: '7.5',
          Poster: 'poster1.jpg',
          Plot: 'Plot 1',
          Actors: 'Actor 1',
        },
      ];
      // Act
      component.updateMovies(movies);
      // Assert
      expect(component.movieDetails).toEqual(movies);
    });
  });

  describe('#resteMovies', () => {
    it('should reset movieDetails to an empty array', () => {
      // Arrange
      component.movieDetails = [
        {
          Title: 'Movie 1',
          Year: '2022',
          imdbRating: '7.5',
          Poster: 'poster1.jpg',
          Plot: 'Plot 1',
          Actors: 'Actor 1',
        },
      ];
      // Act
      component.resetMovies();
      // Assert
      expect(component.movieDetails).toEqual([]);
    });
  });

  describe('#isFirstSlide', () => {
    it('should return true if the movie is the first slide', () => {
      // Arrange
      const movie = 'Movie 1';
      component.moviesPosters = ['Movie 1', 'Movie 2', 'Movie 3'];
      // Act
      const result = component.isFirstSlide(movie);
      // Assert
      expect(result).toBeTrue();
    });

    it('should return false if the movie is not the first slide', () => {
      // Arrange
      const movie = 'Movie 2';
      component.moviesPosters = ['Movie 1', 'Movie 2', 'Movie 3'];
      // Act
      const result = component.isFirstSlide(movie);
      // Assert
      expect(result).toBeFalse();
    });
  });

  describe('#togglePaused', () => {
    it('should toggle paused state and call cycle() if paused is true', () => {
      // Arrange
      component.paused = true;
      component.carousel = jasmine.createSpyObj('NgbCarousel', ['cycle']);
      // Act
      component.togglePaused();
      // Assert
      expect(component.paused).toBeFalse();
      expect(component.carousel.cycle).toHaveBeenCalled();
    });

    it('should toggle paused state and call pause() if paused is false', () => {
      // Arrange
      component.paused = false;
      component.carousel = jasmine.createSpyObj('NgbCarousel', ['pause']);
      // Act
      component.togglePaused();
      // Assert
      expect(component.paused).toBeTrue();
      expect(component.carousel.pause).toHaveBeenCalled();
    });
  });

  describe('#onSlide', () => {
    it('should call togglePaused() when slide is not paused and source is indicator', () => {
      // Arrange
      const slideEvent: TempNgbSlideEvent = {
        paused: false,
        source: NgbSlideEventSource.INDICATOR,
      };
      spyOn(component, 'togglePaused');
      // Act
      component.onSlide(slideEvent as NgbSlideEvent);
      // Assert
      expect(component.togglePaused).toHaveBeenCalled();
    });

    it('should not call togglePaused() when slide is paused', () => {
      // Arrange
      const slideEvent: TempNgbSlideEvent = {
        paused: true,
        source: NgbSlideEventSource.INDICATOR,
      };
      spyOn(component, 'togglePaused');
      // Act
      component.onSlide(slideEvent as NgbSlideEvent);
      // Assert
      expect(component.togglePaused).not.toHaveBeenCalled();
    });

    it('should not call togglePaused() when source is not indicator', () => {
      // Arrange
      const slideEvent: TempNgbSlideEvent = {
        paused: false,
        source: NgbSlideEventSource.ARROW_LEFT,
      };
      spyOn(component, 'togglePaused');
      // Act
      component.onSlide(slideEvent as NgbSlideEvent);
      // Assert
      expect(component.togglePaused).not.toHaveBeenCalled();
    });
  });
});
