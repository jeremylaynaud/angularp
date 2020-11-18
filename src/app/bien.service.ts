import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Bien } from './liste/bien';


@Injectable({ providedIn: 'root' })
export class BienService {

  private biensUrl = 'api/biens';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET bienes from the server */
  getBiens(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.biensUrl)
      .pipe(
        tap(_ => this.log('fetched bienes')),
        catchError(this.handleError<Bien[]>('getBiens', []))
      );
  }

  /** GET bien by id. Return `undefined` when id not found */
  getBienNo404<Data>(id: number): Observable<Bien> {
    const url = `${this.biensUrl}/?id=${id}`;
    return this.http.get<Bien[]>(url)
      .pipe(
        map(bienes => bienes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} bien id=${id}`);
        }),
        catchError(this.handleError<Bien>(`getBien id=${id}`))
      );
  }

  /** GET bien by id. Will 404 if id not found */
  getBien(id: number): Observable<Bien> {
    const url = `${this.biensUrl}/${id}`;
    return this.http.get<Bien>(url).pipe(
      tap(_ => this.log(`fetched bien id=${id}`)),
      catchError(this.handleError<Bien>(`getBien id=${id}`))
    );
  }

  /* GET bienes whose name contains search term */
  searchBiens(term: string): Observable<Bien[]> {
    if (!term.trim()) {
      // if not search term, return empty bien array.
      return of([]);
    }
    return this.http.get<Bien[]>(`${this.biensUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found bienes matching "${term}"`) :
         this.log(`no bienes matching "${term}"`)),
      catchError(this.handleError<Bien[]>('searchBiens', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new bien to the server */
  addBien(bien: Bien): Observable<Bien> {
    return this.http.post<Bien>(this.biensUrl, bien, this.httpOptions).pipe(
      tap((newbien: Bien) => this.log(`added bien w/ id=${newbien.id}`)),
      catchError(this.handleError<Bien>('addbien'))
    );
  }

  /** DELETE: delete the bien from the server */
  deletebien(bien: Bien | number): Observable<Bien> {
    const id = typeof bien === 'number' ? bien : bien.id;
    const url = `${this.biensUrl}/${id}`;

    return this.http.delete<Bien>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted bien id=${id}`)),
      catchError(this.handleError<Bien>('deletebien'))
    );
  }

  /** PUT: update the bien on the server */
  updatebien(bien: Bien): Observable<any> {
    return this.http.put(this.biensUrl, bien, this.httpOptions).pipe(
      tap(_ => this.log(`updated bien id=${bien.id}`)),
      catchError(this.handleError<any>('updatebien'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a bienService message with the MessageService */
  private log(message: string) {
    console.log(`bienService: ${message}`);
  }
}