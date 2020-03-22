import { User } from './user.model';

export enum MessageTypes{
    text = 1,
    image
}

export class Message {
    
    user: string;
    text: string;
    type: MessageTypes

    constructor(user: string, text: string, type: MessageTypes) {
        this.user = user;
        this.text = text;
        this.type = type;
    }
}
  