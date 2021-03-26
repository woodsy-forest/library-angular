import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class BookService {

  public book_api_url = '';

  constructor(private http: HttpClient) {
      this.book_api_url = environment.book_api_url;
  }

  GetBooks(): Observable<any> {

    const url: string = this.book_api_url + '/api/books';

    if (environment.debug_mode) {
      console.log("GetBooks: " + url);
    }

    return this.http.get(url);

  }

  GetBookById(id: string): Observable<any> {

    const url: string = this.book_api_url + '/api/books/' + id;

    if (environment.debug_mode) {
      console.log("GetBookById: " + url);
    }

    return this.http.get(url);

  }

  SearchWords(id: string, query: string): Observable<any> {

    const url: string = this.book_api_url + '/api/books/' + id + '/' + query;

    if (environment.debug_mode) {
      console.log("SearchWords: " + url);
    }

    return this.http.get(url);

  }

}
