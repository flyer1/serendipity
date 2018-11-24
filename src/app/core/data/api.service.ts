import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { distinctUntilChanged, tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoggerService } from '../logging/logger.service';
import { DataError } from './data-error.model';
import { LanguageService } from '../language/language.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient, private logger: LoggerService) { }

    get(path: string, params: Object = {}, busyMessage?: string): Observable<any> {
        return this.request('GET', path, params, undefined, busyMessage);
    }

    put(path: string, body: Object = {}, busyMessage?: string): Observable<any> {
        return this.request('PUT', path, undefined, body, busyMessage);
    }

    post(path: string, body: Object = {}, busyMessage?: string): Observable<any> {
        return this.request('POST', path, undefined, body, busyMessage);
    }

    delete(path, busyMessage?: string): Observable<any> {
        return this.request('DELETE', path, undefined, undefined, busyMessage);
    }

    private request(method: string, path: string, params: Object = {}, body: Object = null, busyMessage: string = null): Observable<any> {
        const url = `${environment.apiRootUrl}${path}`;
        const options = {
            params: params ? this.constructURLSearchParams(params) : undefined,
            body: body ? JSON.stringify(body) : undefined,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };

        return this.http.request(method, url, options)
            .pipe(
                catchError(this.handleErrorResponse.bind(this))
            );
    }

    private constructURLSearchParams(params: Object): HttpParams {
        if (params instanceof HttpParams) { return params; }

        // unfortunately the built-in "fromObject" property of HttpParamsOptions just isn't smart enough to build params the way we want, so we're doing it here...
        let searchParams = new HttpParams();
        Object.keys(params)
            .map(k => ({ key: k, value: params[k] }))
            .filter(kvp => kvp.value)
            .forEach(kvp => {
                if (Array.isArray(kvp.value)) {
                    kvp.value.forEach(v => searchParams = searchParams.append(kvp.key, v));
                } else {
                    if (kvp.value instanceof Date) {
                        // was using kvp.value.toJSON() but the timezone can mess up the date;
                        kvp.value = `${kvp.value.getFullYear()}-${(kvp.value.getMonth() + 1)}-${kvp.value.getDate()}`;
                    }
                    searchParams = searchParams.append(kvp.key, kvp.value);
                }
            });

        return searchParams;
    }

    private handleErrorResponse(response: HttpErrorResponse, thing: any): Observable<never> {

        this.popBusyInfo();

        if (response.error instanceof ErrorEvent) {
            // these should be extremely rare unless client is on an unstable network
            this.logger.error(`Client side error during web-data call; details: ${response}`);
            return throwError(DataError.clientNetwork());
        } else {
            switch (response.status) {
                case -1:
                    // status of -1 indicates that the request was cancelled
                    this.logger.info('request cancelled');
                    break;
                case 401:
                case 403:
                    // A 401 / 403 indicates an attempted unauthorized access to a resource
                    return throwError(DataError.unauthorized(response.statusText));
                case 400:
                    // A 400 would indicate some type of invalid action or invalid parameter error - this should be handled appropriately by the caller;
                    return throwError(DataError.badRequest(response.error.message));
                case 404:
                    // a 404 would indicate that a given record wasn't found, or perhaps a search result returned no records
                    return throwError(DataError.notFound());
                case 422:
                    // a 422 is used to indicate a form data validation error - this could occur on views that include forms which did not have client-side processing capable of pre-validating the form
                    return throwError(DataError.validationError(response.error.details));
                case 429:
                    return throwError(DataError.tooManyRequests);
                default:
                    this.logger.error(`Failed web-data call; status: ${response.status} ${response.statusText}`);

                    // We've hit an unexpected error (likely a 500);  throw the error back to the caller so they can decide to communicate to the user or not.
                    return throwError(DataError.serverError(response.statusText));
            }
        }
    }
}

export interface BusyInfo {
    busy: boolean;
    busyMessage?: string;
}
