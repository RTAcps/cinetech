import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private apiUrl: string = 'https://www.omdbapi.com/?i=tt3896198';
  private apiKey: string = '4eedd1ff';

  constructor(private http: HttpClient) {}

  public getFilme(query: string): Observable<any> {
    const url = `${this.apiUrl}&apikey=${this.apiKey}&t=${encodeURIComponent(
      query
    )}&plot=full`;

    return this.http.get(url);
  }
}
