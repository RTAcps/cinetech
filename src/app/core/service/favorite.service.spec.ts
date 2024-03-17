import { TestBed } from '@angular/core/testing';

import { FavoriteService } from './favorite.service';
import { take } from 'rxjs';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle favorite status', async () => {
    // Arrange
    service.toggleFavorite();
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Act
    service.toggleFavorite();
    const isFavorite = await service.isFavorite$.pipe(take(1)).toPromise();

    // Assert
    expect(isFavorite).toBeFalse();
  });

  it('should save favorite to localStorage', () => {
    // Arrange
    // Act
    service.toggleFavorite();
    // Assert
    expect(localStorage.getItem(service['localStorageKey'])).toBeTruthy();
  });

  it('should handle localStorage not available', () => {
    // Arrange
    spyOn(window.localStorage, 'setItem').and.throwError(
      'LocalStorage is not available'
    );
    spyOn(console, 'error');
    // Act
    service.toggleFavorite();
    // Assert
    expect(console.error).toHaveBeenCalledWith('LocalStorage is not available');
  });
});
