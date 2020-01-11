import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JServiceService {
  private jServiceUrl: string = 'http://jservice.io/api';

  constructor(private http: HttpClient) { }

  getClues() {
    return this.http.get(this.jServiceUrl + '/clues');
  }

  getRandom(count: number = 1) {
    return this.http.get(this.jServiceUrl + '/random', {
      params: new HttpParams()
        .set('count', count.toString())
    });
  }

  getCategories() {
    return this.http.get(this.jServiceUrl + '/categories');
  }

  getCategory(id: number) {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get(this.jServiceUrl + '/category', { params: params });
  }
}
