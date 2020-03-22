import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message, MessageTypes } from '../models/message.model';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messageTypes = MessageTypes;
  public messages: Message[];
  public message: string;

  constructor(
    private messageService: MessageService,
    private globalService: GlobalService,
    private router: Router
  ) { 
    this.messages = [];
  }

  ngOnInit(): void {
    if(!this.globalService.currentUser){
      this.router.navigate(['']);
    }

    this.messageService.getMessages().subscribe((res) => {
      this.messages = res;
    });
  }

  getMessageSide(message: Message){
    return message.user == this.globalService.currentUser.username ? 'to' : 'from';
  } 

  sendMessage(type: MessageTypes){
    if(this.message){
      this.messages.push(new Message(this.globalService.currentUser.username, this.message, type));

      if(type == MessageTypes.text){
        this.message = null;
      }
      
      setTimeout(() => {
        document.querySelector('.messages li:last-child').scrollIntoView(false);
      }, 0);
    }
  }
}
