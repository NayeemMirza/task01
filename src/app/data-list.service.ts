import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class DataListService {
  private url: string = '/assets/data.json';
  // private url: string = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<any>{
    return this.httpClient.get(this.url);
  }


}
