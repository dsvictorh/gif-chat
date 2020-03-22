import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  getMessages() : Observable<Message[]>{
    return this.http.get<Message[]>('/assets/dummy/messages.dummy.json');
  }
}
