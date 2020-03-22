import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor(
    private http: HttpClient
  ) { }

  searchGifs(search: string){
    return this.http.get<any>(`https://api.giphy.com/v1/gifs/${search ? 'search': 'trending'}?api_key=${environment.giphyAPIKey}&q=${search}&rating=g`);
  }
}
