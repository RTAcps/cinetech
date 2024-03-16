import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmeService } from '../../core/service/filme.service';
import { Movie } from '../../shared/models/movie';
import { HomeComponent } from './home.component';

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
        {
          Title: 'Movie 2',
          Year: '2023',
          imdbRating: '8.0',
          Poster: 'poster2.jpg',
          Plot: 'Plot 2',
          Actors: 'Actor 2',
        },
      ];
      // Act
      component.updateMovies(movies);
      // Assert
      expect(component.movieDetails).toEqual(movies);
    });
  });
});
