import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  get(path: string, params: Object = {}): Observable<any> {
    return this.request('GET', path, params, undefined);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.request('PUT', path, undefined, body);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.request('POST', path, undefined, body);
  }

  delete(path: string): Observable<any> {
    return this.request('DELETE', path, undefined, undefined);
  }

  private request(method: string, path: string, params: Object = {}, body: Object = null): Observable<any> {
    const url = `${environment.apiRootUrl}${path}`;
    const options = {
      // params: params ? new HttpParams({ fromObject: params }) : undefined,
      body: body ? JSON.stringify(body) : undefined,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    };

    return this.http.request(method, url, options)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(response: HttpErrorResponse): Observable<never> {

    if (response.error instanceof ErrorEvent) {
      const error = `Network unreachable: ${response}`;
      console.error(error);
      return throwError(error);
    } else {
      console.error(`API call failure: ${response.status} ${response.statusText}`);
      return throwError(response.statusText);
    }
  }
}
