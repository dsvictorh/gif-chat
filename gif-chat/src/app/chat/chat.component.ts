import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[];

  constructor() { 
    this.messages = [];
  }

  ngOnInit(): void {

  }

}
