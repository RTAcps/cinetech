import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private isFavoriteSubject = new BehaviorSubject<boolean>(false);
  isFavorite$ = this.isFavoriteSubject.asObservable();

  private localStorageKey = 'favorite';

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const favorite = this.getFavoriteFromLocalStorage();
      this.isFavoriteSubject.next(favorite);
    }
  }

  public toggleFavorite() {
    const currentValue = this.isFavoriteSubject.getValue();
    const newValue = !currentValue;
    this.isFavoriteSubject.next(newValue);

    if (this.isLocalStorageAvailable()) {
      this.saveFavoriteToLocalStorage(newValue);
    } else {
      console.error('LocalStorage is not available');
    }
  }

  private saveFavoriteToLocalStorage(isFavorite: boolean) {
    localStorage.setItem(this.localStorageKey, isFavorite.toString());
  }

  private getFavoriteFromLocalStorage(): boolean {
    const favorite = localStorage.getItem(this.localStorageKey);
    return favorite === 'true';
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__testLocalStorageAvailability__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
