import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  constructor(private http: HttpClient) {}

  public getFilme(): Observable<Object> {
    return this.http.get(
      'https://www.omdbapi.com/?i=tt3896198&apikey=4eedd1ff'
    );
  }
}
