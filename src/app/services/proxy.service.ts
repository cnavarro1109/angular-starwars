import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(
    private http: HttpClient
  ){}

      /**
   * Proxy HttpGet
   * options.header gives options to customize the http request header
   * @param url
   * @param data
   * @param options
   */
  httpGet(url: string, data: any = null, options?) {
    if (options && options.headers) {
        return this.http.get(url, { headers: options.headers, params: { data }, observe: 'response' });
    }
    return this.http.get(url, { params: { data }, observe: 'response' });
  }
}
