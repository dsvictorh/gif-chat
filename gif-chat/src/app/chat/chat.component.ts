import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message, MessageTypes } from '../models/message.model';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private searchSubscription: Subscription;
  private searchTimeout: any;

  public messageTypes = MessageTypes;
  public messages: Message[];
  public gifs: any[];
  public message: string;
  public search: string;
  public gifOpen: boolean;
  public gifSelected: boolean;

  constructor(
    private messageService: MessageService,
    private globalService: GlobalService,
    private gifService: GifService,
    private router: Router
  ) { 
    this.messages = [];
    this.gifs = [];
    this.gifOpen = false;
  }

  ngOnInit(): void {
    if(!this.globalService.currentUser){
      this.router.navigate(['']);
    }

    this.messageService.getMessages().subscribe((res) => {
      this.messages = res;
      this.scrollToBottom();
    });
  }

  getMessageSide(message: Message){
    return message.user == this.globalService.currentUser.username ? 'to' : 'from';
  } 

  sendMessage(text: string, type: MessageTypes){
    if(text){
      this.messages.push(new Message(this.globalService.currentUser.username, text, type));

      if(type == MessageTypes.text){
        this.message = null;
      }

      this.scrollToBottom();
    }
  }

  toggleGif(toggle: boolean){
    this.gifOpen = toggle;

    if(!this.gifOpen){
      this.search = null;
      this.gifs = [];
    }
  }

  searchGif(search: string){
    if(this.searchTimeout){
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }

    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }

    this.searchTimeout = setTimeout(() => {
      this.searchTimeout = null;
      this.searchSubscription = this.gifService.searchGifs(search).subscribe((res) => {
        this.searchSubscription = null;
        this.gifs = res.data.map((gif) => { 
          return { url: gif.images.fixed_height.url, title: gif.title, loaded: false }
         });
        console.log(this.gifs);
      });
    }, 500);
  }

  selectGif(url){
    this.gifSelected = true;

    setTimeout(() => {
      this.sendMessage(url, MessageTypes.image);
      this.toggleGif(false);
      this.gifSelected = false;
    }, 100);
  }

  onGifClick(){
    this.searchGif(null);
    this.toggleGif(true);
  }

  loadGif(gif: any){
    //gif.loaded = true;
  }

  scrollToBottom(){
    setTimeout(() => {
      document.querySelector('.messages li:last-child')?.scrollIntoView(false);
    }, 0);
  }
}
